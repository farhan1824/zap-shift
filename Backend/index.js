require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
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
    const parcelsCollection = database.collection("parcels");
    const paymentHistoryCollection = database.collection("paymenthistory");
    app.post("/parcels", async (req, res) => {
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
    app.get("/parcels", async (req, res) => {
      try {
        const email = req.query.email;

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
    app.delete("/parcels/:id", async (req, res) => {
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
    app.get("/parcels/:ProductId", async (req, res) => {
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
    app.post("/payments", async (req, res) => {
      try {
        const { parcelId, email, amount, transactionId, paymentMethod } =
          req.body;

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
    app.get("/payments", async (req, res) => {
      try {
        const email = req.query.email;

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
