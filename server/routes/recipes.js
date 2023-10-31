const express = require("express");
const recipeRoutes = express.Router();
 const dbo = require("../db/conn");
 
// convert the id from string to ObjectId for the _id.

recipeRoutes.get("/recipe", (req, res) => {
  
  const db_connect = dbo.getDb("recipe_db");
  
  db_connect.collection("indian_recipes")
  .find({}).toArray()
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
  
  db_connect.collection("indian_recipes")
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
 
// update a recipe by id.
recipeRoutes.post("/update/:id", (req, res) => {
  console.log("Updating recipe for ID:", req.params.id);
  
  const db_connect = dbo.getDb("recipe_db");
  const recipeId = parseInt(req.params.id, 10); // Convert the id string to an integer

  // Construct the update object dynamically based on provided fields in req.body
  const fieldsToUpdate = [
    'name', 'ingredients', 'description', 'image_url', 'rating', 
    'instructions', 'cuisine', 'course', 'diet', 'prep_time'
  ];

  const setValues = {};
  fieldsToUpdate.forEach(field => {
    if (req.body[field]) {
      setValues[field] = req.body[field];
    }
  });
  
  if (req.body.reviews && req.body.reviews.length > 0) {
    const review = req.body.reviews[0]; // Get the first review from the array
    
    const pushValues = {
        reviews: {
            name: review.name,
            details: {
                reviewText: review.details.reviewText,
                rating: review.details.rating
            }
        }
    };
    
    db_connect.collection("indian_recipes")
        .updateOne({ id: recipeId }, { $push: pushValues })
        .then(result => {
            // rest of your code
        })
        .catch(err => {
            // handle error
        });
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