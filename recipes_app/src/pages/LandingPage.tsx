import { useState } from "react";
import RecipeElement from "../components/recipeElement";
import { mockUsers } from "../mockData/mockData";
import "../styling/LandingPage.css";
import "../styling/recipeElement.css";
import { Autocomplete, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";



function LandingPage() {
  const [searchResults, setSearchResults] = useState("");

  function SearchFunction(event, values) {
    const recipeResults = mockUsers.filter((recipe) => recipe.title.toLowerCase().includes(values.toLowerCase()))
  }

  return (
    <>
      <h1></h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={mockUsers}
        sx={{ paddingTop: 10, maxWidth: 600}}
        onChange={(event, newValue) => SearchFunction(event, newValue)}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <section className="recipe-grid">
        {mockUsers.map((recipe) => (
          <div className="recipe-element" key={recipe.id}>
            <RecipeElement
              recipeID={recipe.id}
              imagePath={recipe.icon_path}
              title={recipe.title}
              description={recipe.description}
            />
          </div>
        ))}
      </section>
      <div className="pagination-container">
        <Pagination count={20} color="secondary" shape="rounded" />
      </div>
    </>
  );
}

export default LandingPage;
