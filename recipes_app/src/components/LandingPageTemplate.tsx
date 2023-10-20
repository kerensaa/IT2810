import RecipeElement from '../components/recipeElement';
import { Recipe } from '../mockData/mockData';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../utils/paginationUtils';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface LandingPageTemplateProps {
  dataSource: Recipe[];
}

function LandingPageTemplate(props: LandingPageTemplateProps) {
  const [searchResults, setSearchResults] = useState(props.dataSource);

  // pagination state, variables and functions
  const elementsPerPage: number = 3;
  const { currentPage, elementsDisplayed, handlePageChange } = usePagination(1, elementsPerPage, searchResults);

  function SearchFunction(values: string | null) {
    const recipeResults = props.dataSource;
    if (typeof values === 'string' && values !== null) {
      const recipeResults = props.dataSource.filter((recipe) =>
        recipe.title.toLowerCase().includes(values.toLowerCase()),
      );
      setSearchResults(recipeResults);
    } else {
      setSearchResults(recipeResults);
    }
  }

  return (
    <>
      <section className={'search_bar'}>
        <h1></h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={props.dataSource.map((option) => option.title)}
          onChange={(_, newValue) => SearchFunction(newValue)}
          renderInput={(params) => <TextField {...params} label="Search" />}
          freeSolo
        />
      </section>
      <section className="recipe-grid">
        <>
          {console.log(elementsDisplayed)}
          {elementsDisplayed.length === 0 ? (
            <h1>No result</h1>
          ) : (
            <>
              {elementsDisplayed.map((recipe) => (
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
        <Pagination
          count={Math.ceil(props.dataSource.length / elementsPerPage)}
          color="secondary"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default LandingPageTemplate;
