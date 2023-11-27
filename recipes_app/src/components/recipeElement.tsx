import { Link } from 'react-router-dom';
import '../styling/HeartButton.css';
import Favorite from './Favorites';
import Ratings from './Ratings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface RecipeElementProps {
  recipeID: number;
  imagePath: string;
  title: string;
  description: string;
  preptime: string;
}

export default function RecipeElement(props: RecipeElementProps) {
  const { recipeID, imagePath, title, description, preptime } = props;

  return (
    <section>
      <Link to={`/project2/${recipeID}`}>
        <img className="recipe-image" src={imagePath} alt={title} />
      </Link>
      <div className="recipe-title">
        <Link to={`/project2/${recipeID}`}>
          <h3>{title}</h3>
        </Link>
        <div className="rate-and-favorite">
          <Ratings title={title}></Ratings>
          <div className="button-placement">
            <Favorite title={title}></Favorite>
          </div>
          <div className="prep-time">
            <AccessTimeIcon></AccessTimeIcon>
            <text>{preptime} min</text>
          </div>
        </div>
      </div>
      <Link to={`/project2/${recipeID}`}>
        <p className="recipe-info"> {description.slice(0, 100)} ...</p>
      </Link>
    </section>
  );
}
