import { Link } from "react-router-dom";
import "../styling/HeartButton.css";
import Favorite from "./Favorites";
import Ratings from "./Ratings";

interface RecipeElementProps {
  recipeID: number;
  imagePath: string;
  title: string;
  description: string;
}

export default function RecipeElement(props: RecipeElementProps) {
  const { recipeID, imagePath, title, description } = props;

  return (
    <section>
      <Link to={`/${recipeID}`}>
        <img className="recipe-image" src={imagePath} alt={title} />
      </Link>
      <div className="recipe-title">
        <Link to={`/${recipeID}`}>
          <h3>{title}</h3>
        </Link>
        <div className="rate-and-favorite">
          <Ratings title={title}></Ratings>
          <div className="button-placement">
            <Favorite title={title}></Favorite>
          </div>
        </div>
      </div>
      <Link to={`/${recipeID}`}>
        <p className="recipe-info"> {description}</p>
      </Link>
    </section>
  );
}
