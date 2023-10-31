const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const port = 5001;  // use a different port for this test

const uri = "mongodb+srv://gruppe32:WebDev32@cluster0.acrm5ll.mongodb.net/?retryWrites=true&w=majority";  // replace with your connection string
const client = new MongoClient(uri);

client.connect(err => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    return;
  }
  const collection = client.db("recipe_db").collection("recipes");
  
  app.get("/test-db", (req, res) => {
    collection.findOne({ id: 6 }, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
        return;
      }
      res.json(result);
    });
  });

  app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
});
