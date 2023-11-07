import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
import { fetchRecipeById } from '../api';
import CommentsDB from '../components/CommentsDB';
import Favorite from '../components/Favorites';
import Ratings from '../components/Ratings';
import { RecipeType } from '../types';

export default function Recipe() {
  const { recipeId } = useParams();
  const recipeIdNum = parseInt(recipeId!, 10);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  const handleDeleteComment = (commentId: number) => {
    if (commentId) {
      deleteComment(commentId);
    } else {
      console.error('Invalid commentId:', commentId);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <Container>
        <div className="button-container">
          <button className="back-button" onClick={handleGoBack}>
            Back
          </button>
          <img className="recipe-img" src={recipe?.image_url} alt={recipe?.image_url} />
        </div>
        <div className="card-container">
          <Card className="recipe-card" style={{ backgroundColor: '#F5EDF7', width: '100%' }}>
            <CardContent className="recipe-card-content" style={{ width: '95%' }}>
              <Favorite title={recipe!.name}></Favorite>
              <h2>{recipe?.name}</h2>
              <div className="prep-time">
                <AccessTimeIcon></AccessTimeIcon>
                <text>{recipe?.prep_time} min</text>
              </div>
              <p>{recipe?.description}</p>
              <h3>Ingredients:</h3>
              <div>
                <ul>{recipe?.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
              </div>
            </CardContent>
          </Card>
          <div className="rating-card">
            <Card className="rating-card-section" style={{ backgroundColor: '#F5EDF7', marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h6">What did you think about this recipe?</Typography>
                <Box mt={2}>
                  <div
                    className="rating-box-style"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Ratings title={recipe.name}></Ratings>
                  </div>
                </Box>
                <div className="rating-text-holder" style={{ display: 'flex', alignItems: 'center' }}>
                  <textarea
                    className="rating-text-holder"
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
                    className="post-button"
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
          <Container className="comment-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <Accordion className="comment-section" style={{ backgroundColor: '#BB99CD', width: '60%' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>See comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {filteredComments.map((comment) => (
                  <div className="comment-paper-div" key={comment.id} style={{ position: 'relative' }}>
                    <Paper
                      className="comment-paper"
                      sx={{
                        m: 2,
                        whiteSpace: 'pre-line',
                        width: '95%',
                        overflow: 'visible',
                      }}
                    >
                      <div className="comment-delete-div" style={{ display: 'flex', position: 'relative' }}>
                        <IconButton
                          className="comment-delete"
                          size="small"
                          color="secondary"
                          style={{ position: 'absolute', top: '0', right: '0' }}
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="comment-text-div" style={{ wordWrap: 'break-word', padding: '30px 0 0 0' }}>
                        {comment.text}
                      </div>
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
