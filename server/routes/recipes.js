const express = require("express");
const recipeRoutes = express.Router();
const dbo = require("../db/conn");

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recipeRoutes.get("/recipe", (req, res) => {
  const db_connect = dbo.getDb("recipe_db");

  let filterQuery = {};
  if (req.query.course && req.query.course !== "default") {
    filterQuery.course = req.query.course;
  } else {
  }

  let sortQuery = {};
  switch (req.query.sort) {
    case "prep_time":
      sortQuery = { prep_time: 1 };
      break;
    case "name":
      sortQuery = { name: 1 };
      break;
    default:
      break;
  }
  db_connect
    .collection("indian_recipes")
    .find(filterQuery)
    .sort(sortQuery)
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching recipes:", err);
      res.status(500).send("Error fetching recipes");
    });
});

// get a single recipe by id
recipeRoutes.get("/recipe/:id", (req, res) => {
  console.log("Fetching recipe for ID:", req.params.id);

  const db_connect = dbo.getDb("recipe_db");
  const recipeId = parseInt(req.params.id, 10);

  db_connect
    .collection("indian_recipes")
    .findOne({ id: recipeId })
    .then((result) => {
      console.log("Found recipe:", result);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching recipe:", err);
      res.status(500).json({ error: "Error fetching recipe" });
    });
});

// update a recipe by id.
recipeRoutes.post("/update/:id", (req, res) => {
  console.log("Updating recipe for ID:", req.params.id);

  const db_connect = dbo.getDb("recipe_db");
  const recipeId = parseInt(req.params.id, 10); // Convert the id string to an integer

  // Construct the update object dynamically based on provided fields in req.body
  const fieldsToUpdate = [
    "name",
    "ingredients",
    "description",
    "image_url",
    "rating",
    "instructions",
    "cuisine",
    "course",
    "diet",
    "prep_time",
  ];

  let updateObject = {};
  fieldsToUpdate.forEach((field) => {
    if (req.body[field]) {
      updateObject[field] = req.body[field];
    }
  });

  if (updateValues.reviews) {
    updateObject["reviews"] = {
      $push: { reviews: { $each: updateValues.reviews } },
    };
  }
  const newvalues = {
    $set: updateObject,
  };

  db_connect
    .collection("indian_recipes")
    .updateOne({ id: recipeId }, newvalues)
    .then((result) => {
      console.log("Document updated:", result);
      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Recipe not found" });
      } else {
        res.json({ message: "Recipe updated successfully" });
      }
    })
    .catch((err) => {
      console.error("Error updating recipe:", err);
      res.status(500).json({ error: "Error updating recipe" });
    });
});

module.exports = recipeRoutes;
