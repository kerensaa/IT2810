import RecipeElement from '../components/recipeElement';
import { Recipe } from '../mockData/mockData';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../utils/paginationUtils';
import { useEffect, useState } from 'react';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface LandingPageTemplateProps {
  dataSource: Recipe[];
}

function LandingPageTemplate(props: LandingPageTemplateProps) {
  const [searchResults, setSearchResults] = useState(props.dataSource);

  useEffect(() => {
    setSearchResults(props.dataSource);
  }, [props.dataSource]);

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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={props.dataSource.map((option) => option.title)}
          onChange={(_, newValue) => SearchFunction(newValue)}
          renderInput={(params) => <TextField {...params} label="Search" />}
          freeSolo
          fullWidth
        />
        <FormControl className="sort_select">
          <InputLabel>Sort</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
            <MenuItem>Date</MenuItem>
            <MenuItem>Cooking Time</MenuItem>
          </Select>
        </FormControl>
      </section>
      <section className="recipe-grid">
        <>
          {searchResults.length === 0 ? (
            <>
              <h1>No result </h1>
            </>
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
        {searchResults.length === 0 ? (
          <></>
        ) : (
          <Pagination
            count={Math.ceil(searchResults.length / elementsPerPage)}
            color="secondary"
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}

export default LandingPageTemplate;
