import { Rate } from "antd";
import "../styling/HeartButton.css";
import Heart from "./Heart";

interface RecipeElementProps {
  imagePath: string;
  title: string;
  description: string;
}

export default function RecipeElement(props: RecipeElementProps) {
  const { imagePath, title, description } = props;

  return (
    <section>
      <img className="recipe-image" src={imagePath} alt={title} />
      <div className="recipe-title">
        <h3>{title}</h3>
        <div className="rate-and-favorite">
          <Rate defaultValue={0}></Rate>
          <div className="button-placement">
            <button className="h-container">
              <Heart></Heart>
            </button>
          </div>
        </div>
      </div>
      <p className="recipe-info"> {description}</p>
    </section>
  );
}
