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
  Typography,
} from '@mui/material';
import { SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsDB from '../components/CommentsDB';
import Favorite from '../components/Favorites';
import Ratings from '../components/Ratings';
import { mockUsers } from '../mockData/mockData';

export default function Recipe() {
  const { recipeId } = useParams();
  const recipeIdNum = parseInt(recipeId!, 10);
  const matchedRecipe = mockUsers.find((recipe) => recipe.id === recipeIdNum);

  const handleGoBack = () => {
    history.back();
  };

  const formattedIngredients = matchedRecipe?.ingredients
    ? matchedRecipe.ingredients.split(',').map((ingredient) => ingredient.trim().replace(/"/g, ''))
    : [];
  const [comment, setComment] = useState('');
  const { comments, addComment } = CommentsDB();

  const filteredComments = comments.filter((comment) => comment.recipeId === recipeIdNum);

  const handleCommentChange = (event: { target: { value: SetStateAction<string> } }) => {
    setComment(event.target.value);
  };
  const postComment = () => {
    if (comment.trim() !== '') {
      addComment(recipeIdNum, comment);
      setComment('');
    }
  };

  return (
    <>
      <Container>
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>

        <img className="recipe-img" src={matchedRecipe?.icon_path} alt={matchedRecipe?.icon_path} />
        <div className="card-container">
          <Card style={{ backgroundColor: '#F5EDF7' }}>
            <CardContent className="recipe-card-content">
              <Favorite title={matchedRecipe!.title}></Favorite>
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
            <Card style={{ backgroundColor: '#F5EDF7', marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h6">What did you think about this recipe?</Typography>
                <Box mt={2}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Ratings title={matchedRecipe!.title}></Ratings>
                  </div>
                </Box>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <textarea
                    placeholder="Add comment..."
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                    style={{
                      width: '100%',
                      fontSize: '16px',
                      border: '1px solid #ccc',
                    }}
                  />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#C5C6EF',
                      marginLeft: '10px',
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
            <Accordion className="comment-section" style={{ backgroundColor: '#BB99CD', width: 'auto' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>See comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {filteredComments.map((comment, index) => (
                    <div key={comment.id}>{comment.text}</div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </Container>
        </div>
      </Container>
    </>
  );
}
