
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Rating,
  Typography
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import Heart from "../components/Heart";
import { mockUsers } from "../mockData/mockData";

export default function Recipe() {
  const { recipeId } = useParams();
  const recipeIdNum = parseInt(recipeId!, 10);
  const matchedRecipe = mockUsers.find((recipe) => recipe.id === recipeIdNum);

  const handleGoBack = () => {
    history.back();
  };

  const formattedIngredients = matchedRecipe?.ingredients
    ? matchedRecipe.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim().replace(/"/g, ""))
    : [];
  const [rating, setRating] = useState<number | null>(null);

  const [comment, setComment] = useState('');

  const handleCommentChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setComment(event.target.value);
  };
  const postComment = () => {
    console.log('Posting comment:', comment);
    setComment('');
  };

  return (
    <>
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
     
      <img src={matchedRecipe?.icon_path} alt={matchedRecipe?.icon_path} />
      <div className="card-container">
        <Card style={{ backgroundColor: "#F5EDF7" }}>
          <CardContent className="recipe-card-content">
            <button className="like-button">
              <Heart></Heart>
            </button>
            <h2>{matchedRecipe?.title}</h2>
            <p>{matchedRecipe?.description}</p>
            <h3>Ingredients:</h3>
            <div>
              {formattedIngredients.map((ingredient, index) => (
                <div key={index}>{ingredient}</div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="rating-card">
          <Card style={{ backgroundColor: "#F5EDF7", marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h6">
                What did you think about this recipe?
              </Typography>
              <Box mt={2}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Rating
                      name="recipe-rating"
                      value={rating}
                      onChange={(_event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </div>
                </div>
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
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#C5C6EF",
                    marginLeft: "10px",
                  }}
                  onClick={postComment}
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
          <Container>
            <div className="comment-section">
              <Accordion>
              <AccordionSummary
          
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
              </Accordion>

            </div>
          </Container>
      </div>
    </>
  );
}
