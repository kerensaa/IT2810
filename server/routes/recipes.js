const express = require("express");
const recipeRoutes = express.Router();
 const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a list of all the recipes.
recipeRoutes.route("/recipe").get(function (req, res) {
  console.log("Inside /recipe route.");
  let db_connect = dbo.getDb("recipe_db");
  console.log("Obtained database connection.");
  db_connect
  .collection("recipes")
  .find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });

});
 
// This section will help you get a single recipe by id
recipeRoutes.route("/recipe/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
  .collection("recipes")
  .find({})
  .toArray(function (err, result) {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to fetch recipes" });
      return;
    }
    res.json(result);
  });
});

recipeRoutes.route("/test").get(function (req, res) {
  res.json({ message: "Test endpoint is working" });
});

recipeRoutes.route("/single-recipe").get(function (req, res) {
  let db_connect = dbo.getDb("recipe_db");
  console.log("Attempting to fetch single recipe from MongoDB...");
  let myquery = { id: 6 };
  db_connect.collection("recipes").findOne(myquery, function (err, result) {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to fetch recipe" });
      return;
    }
    console.log("Successfully fetched recipe:", result);
    res.json(result);
  });
});

 
// This section will help you create a new recipe.
recipeRoutes.route("/recipe/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("recipes").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a recipe by id.
recipeRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("recipes")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a recipe
recipeRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("recipes").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recipeRoutes;