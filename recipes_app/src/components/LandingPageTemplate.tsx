import { Autocomplete, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import RecipeElement from '../components/recipeElement';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import { RecipeType } from '../types';
import { usePagination } from '../utils/paginationUtils';

interface LandingPageTemplateProps {
  dataSource: RecipeType[];
}

function LandingPageTemplate(props: LandingPageTemplateProps) {
  const [searchResults, setSearchResults] = useState<RecipeType[]>([]); // Specify the type explicitly
  const [isLoading, setIsLoading] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log('Setting search results with:', props.dataSource);

    setTimeout(() => {
      setSearchResults(props.dataSource);
      setIsLoading(false);
    }, 1000);
  }, [props.dataSource]);

  // pagination state, variables, and functions
  const elementsPerPage: number = 3;
  const { currentPage, elementsDisplayed, handlePageChange } = usePagination(1, elementsPerPage, searchResults);
  console.log('Elements to be displayed:', elementsDisplayed);

  function SearchFunction(values: string | null) {
    setIsLoading(true);
    setShowNoResults(false);
    const recipeResults = props.dataSource;
    if (typeof values === 'string' && values !== null) {
      const recipeResults = props.dataSource.filter((recipe) =>
        recipe.name.toLowerCase().includes(values.toLowerCase()),
      );
      setSearchResults(recipeResults);
      if (recipeResults.length === 0) {
        setShowNoResults(true);
      }
    } else {
      setSearchResults(recipeResults);
    }
    setIsLoading(false);
  }

  return (
    <>
      <section className={'search_bar'}>
        <h1></h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={props.dataSource.map((option) => option.name)}
          onChange={(_, newValue) => SearchFunction(newValue)}
          renderInput={(params) => <TextField {...params} label="Search" />}
          freeSolo
        />
      </section>
      <section className="recipe-grid">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : showNoResults ? (
          <h1>No results</h1>
        ) : (
          elementsDisplayed.map((recipe) => (
            <div className="recipe-element" key={recipe.id}>
              <RecipeElement
                recipeID={recipe.id}
                imagePath={recipe.image_url}
                title={recipe.name}
                description={recipe.description}
              />
            </div>
          ))
        )}
      </section>
      <div className="pagination-container">
        {isLoading || showNoResults ? (
          <></>
        ) : (
          <Pagination
            count={Math.ceil(elementsDisplayed.length / elementsPerPage)}
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
