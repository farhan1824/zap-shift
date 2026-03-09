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

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("Zap-shift");
    const parcelsCollection = database.collection("parcels");
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
      return res.json({ success: true, message: "Parcel deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
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
