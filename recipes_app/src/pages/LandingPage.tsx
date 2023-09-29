import RecipeElement from "../components/recipeElement";
import { mockUsers } from "../mockData/mockData";
import "../styling/LandingPage.css";
import "../styling/recipeElement.css";

function LandingPage() {

  return (
    <>
      <h1>Recipes</h1>
      <section className="recipe-grid">
        {mockUsers.map((recipe) => (
          <div className="recipe-element" key={recipe.id}>
            <RecipeElement
              imagePath={recipe.icon_path}
              title={recipe.title}
              description={recipe.description}
            />
          </div>
        ))}
      </section>
    </>
  );
}

export default LandingPage;
