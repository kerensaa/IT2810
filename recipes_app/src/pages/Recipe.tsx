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
} from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsDB from '../components/CommentsDB';
import Favorite from '../components/Favorites';
import Ratings from '../components/Ratings';
import { mockUsers } from '../mockData/mockData';
const [isLoading, setIsLoading] = useState(true);

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
  const { comments, addComment, deleteComment } = CommentsDB();

  const filteredComments = comments.filter((c) => c.recipeId === recipeIdNum);

  const handleCommentChange = (event: { target: { value: SetStateAction<string> } }) => {
    setComment(event.target.value);
  };

  const postComment = () => {
    if (comment.trim() !== '') {
      addComment(recipeIdNum, comment);
      setComment('');
    }
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }

    if (!comments || comments.length === 0) {
      console.error('Comments not loaded yet.');
    }
  }, [comments, isLoading]);
  const handleDeleteComment = (commentId: number | undefined) => {
    if (commentId !== undefined) {
      deleteComment(commentId);
    } else {
      console.error('Invalid commentId:', commentId);
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
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Accordion className="comment-section" style={{ backgroundColor: '#BB99CD', width: '60%' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>See comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {filteredComments.map((comment) => (
                  <div key={comment.id} style={{ position: 'relative' }}>
                    <Paper
                      sx={{
                        m: 2,
                        whiteSpace: 'pre-line',
                        width: '95%',
                        overflow: 'visible',
                      }}
                    >
                      <div style={{ display: 'flex', position: 'relative' }}>
                        <IconButton
                          size="small"
                          color="secondary"
                          style={{ position: 'absolute', top: '0', right: '0' }}
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div style={{ wordWrap: 'break-word', padding: '30px 0 0 0' }}>{comment.text}</div>
                    </Paper>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </Container>
        </div>
      </Container>
    </>
  );
}
