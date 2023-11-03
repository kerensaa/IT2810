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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>

        <img className="recipe-img" src={recipe?.image_url} alt={recipe?.image_url} />
        <div className="card-container">
          <Card style={{ backgroundColor: '#F5EDF7' }}>
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
                    <Ratings title={recipe.name}></Ratings>
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
