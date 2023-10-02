import { useParams } from "react-router-dom";
import { mockUsers } from "../mockData/mockData";

export default function Recipe() {
  // get the current id from the link
  const { recipeId } = useParams();
  // convert  id from string to number
  const recipeIdNum: number = parseInt(recipeId!, 10);
  // get the matching object of the recipe id
  const matchedRecipe = mockUsers.find((recipe) => recipe.id === recipeIdNum);

  const handleGoBack = () => {
    history.back();
  };
  return (
    <>
      <button onClick={handleGoBack}>Back</button>
      <img src={matchedRecipe?.icon_path} alt={matchedRecipe?.icon_path}></img>
      <h1>{matchedRecipe?.title}</h1>
      <h2>{matchedRecipe?.description}</h2>
      <h3>{matchedRecipe?.ingredients}</h3>
    </>
  );
}
