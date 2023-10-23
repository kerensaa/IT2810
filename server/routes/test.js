const express = require("express");
const router = express.Router();
 const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a list of all the recipes.
router.route("/test").get(function (req, res) {
  console.log("Inside /test route.");
  let db_connect = dbo.getDb("recipe_db");
  console.log("Obtained database connection.");
  db_connect
  .collection("test")
  .find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });

});
// router.route("/test").get(function (req, res) {
//   res.json({ message: "Test endpoint is working!" });
// });

module.exports = router;