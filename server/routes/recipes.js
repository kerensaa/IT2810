const express = require("express");
const recipeRoutes = express.Router();
const dbo = require("../db/conn");
// convert the id from string to ObjectId for the _id.

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
recipeRoutes.post("/update/:id", async (req, res) => {
  const db_connect = dbo.getDb("recipe_db");
  const recipeId = parseInt(req.params.id, 10);

  if (req.body.reviews && req.body.reviews.length > 0) {
    const review = req.body.reviews[0];
    try {
      const result = await db_connect.collection("indian_recipes")
        .updateOne({ id: recipeId }, { $push: { reviews: review } });

      if (result.modifiedCount === 1) {
        res.json({ message: 'Recipe updated successfully' });
      } else {
        res.status(404).json({ message: 'Recipe not found' });
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
      res.status(500).json({ error: 'Error updating recipe' });
    }
  } else {
    res.status(400).json({ message: 'No review to add' });
  }
});

module.exports = recipeRoutes;

   
/*
  reviews:Object {
    $push:Object {
      reviews:Object {
        $each:Array [
          0:Object {
            name:"Alf",
            details:Object {
              reviewText:"Kinda fishy",
              rating:3
            }
          }
        ]
      }
    }
  }

  reviews:Array [
    0:Object {
      name:"Alf",
      details:Object {
        reviewText:"Kinda fishy",
        rating:3
      }
    }
  ]
  */
