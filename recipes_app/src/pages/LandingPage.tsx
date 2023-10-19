import { useState } from "react";
import RecipeElement from "../components/recipeElement";
import { mockUsers } from "../mockData/mockData";
import "../styling/LandingPage.css";
import "../styling/recipeElement.css";
import { Autocomplete, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function LandingPage() {
  const [searchResults, setSearchResults] = useState(mockUsers);

  function SearchFunction(values: string | null) {
    const recipeResults = mockUsers;

    if (typeof values === "string" && values !== null) {
      const recipeResults = mockUsers.filter((recipe) =>
        recipe.title.toLowerCase().includes(values.toLowerCase())
      );
      setSearchResults(recipeResults);
    } else {
      setSearchResults(recipeResults);
    }
  }

  return (
    <>
      <section className={"search_bar"}>
        <h1></h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={mockUsers.map((option) => option.title)}
          onChange={(_, newValue) => SearchFunction(newValue)}
          renderInput={(params) => <TextField {...params} label="Search" />}
          freeSolo
        />
      </section>
      <section className="recipe-grid">
        <>
          {searchResults.length === 0 ? (
            <h1>No result</h1>
          ) : (
            <>
              {searchResults.map((recipe) => (
                <div className="recipe-element" key={recipe.id}>
                  <RecipeElement
                    recipeID={recipe.id}
                    imagePath={recipe.icon_path}
                    title={recipe.title}
                    description={recipe.description}
                  />
                </div>
              ))}
            </>
          )}
        </>
      </section>
      <div className="pagination-container">
        <Pagination count={20} color="secondary" shape="rounded" />
      </div>
    </>
  );
}

export default LandingPage;
