require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dns = require('dns');

// Pass an array of strings
dns.setServers(['8.8.8.8', '8.8.4.4']);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const serviceAccount = require("./zap-shift-firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bkhpsxf.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("Zap-shift");
    const usersCollection = database.collection("users");
    const parcelsCollection = database.collection("parcels");
    const paymentHistoryCollection = database.collection("paymenthistory");
    const riderCollection = database.collection("rider");
    // jwt token middleware
    const TokenVerify = async (req, res, next) => {
      // console.log("header in middlware", req.headers);
      const authheader = req.headers.authorization;
      // const authheader = req.headers.Authorization;
      if (!authheader) {
        return res.status(401).send({
          message: "Unauthorized Access",
        });
      }
      const Token = authheader.split(" ")[1];
      if (!Token) {
        return res.status(401).send({
          message: "Unauthorized Access",
        });
      }
      // verify the token
      try {
        const decode = await admin.auth().verifyIdToken(Token);
        req.decoded = decode;
        next();
      } catch (error) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
    };

    // Admin verify middleware
    const AdminVerify = async (req, res, next) => {
      try {
        const email = req.decoded?.email;

        if (!email) {
          return res.status(401).send({ message: "Unauthorized Access" });
        }

        const user = await usersCollection.findOne(
          { email },
          { projection: { role: 1 } }
        );

        if (!user || user.role !== "admin") {
          return res.status(403).send({ message: "Forbidden: Admin only" });
        }

        next();
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
      }
    };


    app.post("/rider", TokenVerify, async (req, res) => {
      const email = req.body.email;
      const riderexists = await riderCollection.findOne({ email });
      if (riderexists) {
        return res
          .status(200)
          .send({ message: "rider already exists", inserted: false });
      } else {
        const rider = req.body;
        const result = await riderCollection.insertOne(rider);
        res.send(result);
      }
    });

// rider details for parcels admin can only view this information
// Get rider details with assigned parcels
// Get all riders with their assigned parcels
app.get("/riders/parcels", TokenVerify, AdminVerify, async (req, res) => {
  try {
    const riders = await riderCollection.find({}).toArray();

    // For each rider, find assigned parcels
    const ridersWithParcels = await Promise.all(
      riders.map(async (rider) => {
        const parcels = await parcelsCollection
          .find({
            delivery_status: "assigned",
            $or: [
              { "assignedRiders.senderRider": rider.email },
              { "assignedRiders.receiverRider": rider.email },
            ],
          })
          .toArray();

        return {
          name: rider.name,
          email: rider.email,
          region: rider.region,
          parcels: parcels.map((p) => p.tracking_id),
        };
      })
    );

    res.json(ridersWithParcels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});
    // active riders
    app.get("/rider/active", TokenVerify, AdminVerify, async (req, res) => {
      const { status } = req.query;

      let query = { status: "active" };

      // ✅ If status is provided → filter
      if (status) {
        query.status = status;
      }

      const result = await riderCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/riders", TokenVerify, async (req, res) => {
      const { status } = req.query;

      let query = {};

      // ✅ If status is provided → filter
      if (status) {
        query.status = status;
      }

      const result = await riderCollection.find(query).toArray();
      res.send(result);
    });
    app.patch("/riders/:id", TokenVerify, async (req, res) => {
      try {
        const { id } = req.params;
        const { status, email } = req.body;
        if (!["active", "disapproved"].includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
        }

        const result = await riderCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );
        if (status === "active") {
          const RoleUpdate = await usersCollection.updateOne(
            { email: email },
            { $set: { role: "rider" } }
          );
          if (RoleUpdate.matchedCount === 0) {
            return res.status(404).json({ message: "Rider not found" });
          }
        }
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Rider not found" });
        }

        res.json({ message: `Rider has been ${status}` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
      }
    });

    // GET /users/role?email=user@example.com
    app.get("/users/role", TokenVerify, AdminVerify, async (req, res) => {
      try {
        const { email } = req.query;

        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const user = await usersCollection.findOne(
          { email },
          { projection: { email: 1, role: 1 } }
        );

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({
          email: user.email,
          role: user.role || "user", // fallback if role not set
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });



    app.post("/users", TokenVerify, async (req, res) => {
      const email = req.body.email;
      const userexists = await usersCollection.findOne({ email });
      if (userexists) {
        return res
          .status(200)
          .send({ message: "user already exists", inserted: false });
      } else {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
      }
    });

    // GET /users/search?email=<partialEmail>
    app.get("/users/search", TokenVerify, AdminVerify, async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email query is required" });

        // Use case-insensitive regex for partial match
        const regex = new RegExp(email, "i");
        const users = await usersCollection
          .find({ email: { $regex: regex } })
          .project({ email: 1, created_at: 1, role: 1 }) // only return needed fields
          .toArray();

        if (users.length === 0) return res.status(404).json({ message: "No users found" });

        res.json(users);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });

    // PATCH /users/:id/role
    // Body: { role: "admin" } → promote, { role: "user" } → demote
    app.patch("/users/:id/role", TokenVerify, AdminVerify, async (req, res) => {
      try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
          return res.status(400).json({ message: "Role is required" });
        }

        // You can restrict to valid roles only if needed
        const validRoles = ["user", "admin", "rider"];
        if (!validRoles.includes(role)) {
          return res.status(400).json({ message: `Role must be one of: ${validRoles.join(", ")}` });
        }

        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({
          message: `User role updated to "${role}"`,
          userId: id,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });

    app.post("/parcels", TokenVerify, async (req, res) => {
      try {
        const parcelData = req.body;

        const result = await parcelsCollection.insertOne(parcelData);

        res.send(result);
      } catch (error) {
        res.status(500).send({
          message: "Failed to save parcel",
          error,
        });
      }
    });
    // .Checking parcel statue whther the parcel is assignable or not to the rider
    // GET /parcels/assignable
    app.get("/parcels/assignable", TokenVerify, AdminVerify, async (req, res) => {
      try {
        const query = {
          payment_status: "paid",
          delivery_status: "pending",
        };

        const parcels = await parcelsCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        res.json(parcels);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    app.get("/parcels", TokenVerify, async (req, res) => {
      try {
        const email = req.query.email;
        if (email !== req.decoded.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
        // console.log(req.headers);

        if (!email) {
          return res.status(400).send({ message: "Email is required" });
        }

        const query = { created_by: email };

        const parcels = await parcelsCollection
          .find(query)
          .sort({ createdAt: -1 }) // newest first
          .toArray();

        res.send(parcels);
      } catch (error) {
        res.status(500).send({ message: "Server error", error });
      }
    });

    // assign rider to parcel if the parcel is in the same district then only one rider will be assigned but if the sender and receiver are in different district then two riders will be assigned one for sender and another for receiver
    // PATCH /parcels/:id/assign
    // Body: { riderEmail: string }
    app.patch("/parcels/:id/assign", TokenVerify, AdminVerify, async (req, res) => {
      try {
        const { id } = req.params;
        const { riderEmail } = req.body; // Expecting an array
        console.log(riderEmail);

        if (!riderEmail || !Array.isArray(riderEmail) || riderEmail.length === 0) {
          return res.status(400).json({ message: "Rider email(s) are required" });
        }

        // Find the parcel first
        const parcel = await parcelsCollection.findOne({ _id: new ObjectId(id) });
        if (!parcel) {
          return res.status(404).json({ message: "Parcel not found" });
        }

        // Determine rider assignments as an object
        let assignedRiders = {};

        if (riderEmail.length === 1) {
          // Only one rider → assign to both sender and receiver
          assignedRiders = {
            receiverRider: riderEmail[0],
            senderRider: riderEmail[0],
          };
        } else if (riderEmail.length >= 2) {
          // Two riders → first is receiver, second is sender
          assignedRiders = {
            receiverRider: riderEmail[0],
            senderRider: riderEmail[1],
          };
        }

        // Update the parcel
        const result = await parcelsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: {  assignedRiders: assignedRiders, delivery_status: "assigned"} }
        );

        return res.json({ message: "Rider(s) assigned successfully", result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
      }
    });
    app.delete("/parcels/:id", TokenVerify, async (req, res) => {
      try {
        const id = req.params.id;

        const result = await parcelsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 1) {
          return res.json({
            success: true,
            message: "Parcel deleted successfully",
          });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Parcel not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Server error", error });
      }
    });
    // getting information for payment
    app.get("/parcels/:ProductId", TokenVerify, async (req, res) => {
      try {
        const { ProductId } = req.params;

        const query = { _id: new ObjectId(ProductId) };

        const parcel = await parcelsCollection.findOne(query);

        if (!parcel) {
          return res.status(404).send({ message: "Parcel not found" });
        }

        res.send(parcel);
      } catch (error) {
        res.status(500).send({ message: "Server error", error });
      }
    });
    app.post("/payments", TokenVerify, async (req, res) => {
      try {
        const { parcelId, email, amount, transactionId, paymentMethod } =
          req.body;
        if (email !== req.decoded.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
        if (!parcelId || !transactionId) {
          return res.status(400).send({
            success: false,
            message: "Missing required payment info",
          });
        }

        // 1️⃣ Update parcel payment status
        const updateResult = await parcelsCollection.updateOne(
          { _id: new ObjectId(parcelId) },
          {
            $set: {
              payment_status: "paid",
              transactionId: transactionId,
              paid_at: new Date(),
            },
          },
        );
        const parcel = await parcelsCollection.findOne({
          _id: new ObjectId(parcelId),
          created_by: email,
        });
        // 2️⃣ Save payment history
        const paymentRecord = {
          parcelId,
          // tracking_id,
          tracking_id: parcel.tracking_id,
          email,
          amount,
          transactionId,
          paymentMethod,
          paid_at: new Date(),
        };

        const historyResult =
          await paymentHistoryCollection.insertOne(paymentRecord);

        res.send({
          success: true,
          updateResult,
          historyResult,
        });
      } catch (error) {
        console.error(error);

        res.status(500).send({
          success: false,
          message: "Payment save failed",
        });
      }
    });
    app.get("/payments", TokenVerify, async (req, res) => {
      // console.log("header for payment", req.headers);
      try {
        const email = req.query.email;

        if (email !== req.decoded.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }

        let query = {};

        if (email) {
          query.email = email;
        }

        const payments = await paymentHistoryCollection
          .find(query)
          .sort({ paid_at: -1 })
          .toArray();

        res.send(payments);
      } catch (error) {
        res.status(500).send({ message: "Server error" });
      }
    });

    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { amount } = req.body;

        if (!amount) {
          return res.status(400).json({
            success: false,
            message: "Amount is required",
          });
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Number(amount), // amount in cents
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Stripe error:", error);

        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.error);

app.get("/", (req, res) => {
  res.send("Zap Shift Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
