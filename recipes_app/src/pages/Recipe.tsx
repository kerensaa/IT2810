import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SetStateAction, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Favorite from "../components/Favorites";
import Ratings from "../components/Ratings";
import { fetchRecipeById, postReviewToRecipe } from "../api";
import { RecipeType } from "../types";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Recipe() {
  const { recipeId } = useParams();
  const recipeIdNum = parseInt(recipeId!, 10);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipeById(recipeIdNum);

        if (data) {
          setRecipe(data);
        } else {
          setError('Recipe not found');
        }
      } catch (error) {
        console.error('Fetching error:', error);
        setError('Error fetching recipe');
      }
    };

    fetchData();
  }, [recipeIdNum]);
  const handleGoBack = () => {
    history.back();
  };

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const [comment, setComment] = useState("");

  const handleCommentChange = (event: { target: { value: SetStateAction<string> } }) => {
    setComment(event.target.value);
  };
  

  const postComment = async () => {
    const review = {
      name: name,
      details: {
        reviewText: comment,
        rating: rating,
      },
    };
  
    try {
      // Send the review to the backend.
      const response = await postReviewToRecipe(recipeIdNum, review);
      if (response && response.message === 'Recipe updated successfully') {
        // Fetch the updated recipe data to refresh comments
        const updatedRecipe = await fetchRecipeById(recipeIdNum);
        setRecipe(updatedRecipe); // This will include the updated comments
  
        // Clear the input fields.
        setComment("");
        setName("");
        setRating(0);
      } else {
        console.error("Review was not posted successfully");
      }
    } catch (error) {
      console.error("Error posting the review:", error);
    }
  };
  
  
  

  
  const canSubmit = name && rating && comment;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));  // Convert string to number.
  };
  
  // const handleDeleteComment = (commentId: number) => {
  //   if (commentId) {
  //     deleteComment(commentId);
  //   } else {
  //     console.error('Invalid commentId:', commentId);
  //   }
  // };

  if (!recipe) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <Container>
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>

        <img
          className="recipe-img"
          src={recipe?.image_url}
          alt={recipe?.name}
        />

        <div className="card-container">
          <Card style={{ backgroundColor: "#F5EDF7" }}>
            <CardContent className="recipe-card-content">
              <Favorite title={recipe!.name}></Favorite>
              <h2>{recipe?.name}</h2>
              <div className="prep-time">
                <AccessTimeIcon></AccessTimeIcon>
                <text>{recipe?.prep_time} min</text>
              </div>
              <p>{recipe?.description}</p>
              <h3>Ingredients:</h3>
              <div>{recipe?.ingredients.map((ingredient, index) => <div key={index}>{ingredient}</div>)}</div>
            </CardContent>
          </Card>
          <div className="rating-card">
            <Card style={{ backgroundColor: "#F5EDF7", marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h6">
                  What did you think about this recipe?
                </Typography>
                <Box mt={0}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Ratings 
                      title={recipe.name}
                      value={rating}
                      onChange={(newRating) => setRating(newRating)}
                    />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Your name"
                    style={{ width: "100%", marginTop: "10px", padding: "5px" }}
                  />
                </Box>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <textarea
                    placeholder="Add comment..."
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {/* Disable the Post button if canSubmit is false */}
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#C5C6EF",
                      marginLeft: "10px",
                    }}
                    onClick={postComment}
                    disabled={!canSubmit}
                  >
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Accordion className="comment-section" style={{ backgroundColor: '#BB99CD', width: '60%' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>See comments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {recipe?.reviews?.map((review, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <Paper
                    sx={{
                      m: 2,
                      whiteSpace: 'pre-line',
                      width: '95%',
                      overflow: 'visible',
                    }}
                  >
                    <Typography>{review.name}</Typography>
                    <Typography>{review.details.reviewText}</Typography>
                    <Typography>Rating: {review.details.rating}</Typography>
                  </Paper>
                </div>
              ))}
            </AccordionDetails>

          </Accordion>
        </Container>
      </Container>
    </>
);

}
