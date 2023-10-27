const express = require("express");
const recipeRoutes = express.Router();
 const dbo = require("../db/conn");
 
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 

recipeRoutes.get("/recipe", (req, res) => {
  
  const db_connect = dbo.getDb("recipe_db");
  
  db_connect.collection("recipes")
  .find({}).limit(10).toArray()
  .then(result => {
      res.json(result);
  })
  .catch(err => {
      console.error("Error fetching recipes:", err);
      res.status(500).send('Error fetching recipes');
  });
});
 
// get a single recipe by id
recipeRoutes.get("/recipe/:id", (req, res) => {
  console.log("Fetching recipe for ID:", req.params.id);
  
  const db_connect = dbo.getDb("recipe_db");
  const recipeId = parseInt(req.params.id, 10);
  
  db_connect.collection("recipes")
    .findOne({ id: recipeId })
    .then(result => {
      console.log("Found recipe:", result);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Recipe not found' });
      }
    })
    .catch(err => {
      console.error("Error fetching recipe:", err);
      res.status(500).json({ error: 'Error fetching recipe' });
    });
});

 
// create a new recipe.
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
 
// update a recipe by id.
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
 
// // delete a recipe
// recipeRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("recipes").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = recipeRoutes;