const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db;
 
module.exports = {
    connectToServer: function (callback) {
        client.connect()
        .then(db => {
          _db = db.db("recipe_db");
          console.log("Successfully connected to MongoDB.");
          callback(null);
        })
        .catch(err => {
          console.error("Error connecting to MongoDB:", err);
          callback(err);
        });
        },
 
    getDb: function () {
        return _db;
    },
};