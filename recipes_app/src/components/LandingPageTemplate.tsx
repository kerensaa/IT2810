import RecipeElement from '../components/recipeElement';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../utils/paginationUtils';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { RecipeType } from '../types';
import Sorting from './Sorting';

interface LandingPageTemplateProps {
  dataSource: RecipeType[];
}

function LandingPageTemplate(props: LandingPageTemplateProps) {
  const [searchResults, setSearchResults] = useState(props.dataSource);

  useEffect(() => {
    console.log('Setting search results with:', props.dataSource);
    setSearchResults(props.dataSource);
  }, [props.dataSource]);

  // pagination state, variables and functions
  const elementsPerPage: number = 3;
  const { currentPage, elementsDisplayed, handlePageChange } = usePagination(1, elementsPerPage, searchResults);
  console.log('Elements to be displayed:', elementsDisplayed);

  function SearchFunction(values: string | null) {
    const recipeResults = props.dataSource;
    if (typeof values === 'string' && values !== null) {
      const recipeResults = props.dataSource.filter((recipe) =>
        recipe.name.toLowerCase().includes(values.toLowerCase()),
      );
      setSearchResults(recipeResults);
    } else {
      setSearchResults(recipeResults);
    }
  }

  return (
    <>
      <div className="container">
        <section className="left-page">
          <Sorting></Sorting>
        </section>
        <section className="right-page">
          <section className={'search_bar'}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={props.dataSource.map((option) => option.name)}
              onChange={(_, newValue) => SearchFunction(newValue)}
              renderInput={(params) => <TextField {...params} label="Search" />}
              freeSolo
              fullWidth
            />
          </section>
          <section className="recipe-grid">
            <>
              {searchResults.length === 0 ? (
                <>
                  <h1>Loading...</h1>
                </>
              ) : (
                <>
                  {elementsDisplayed.map((recipe) => (
                    <div className="recipe-element" key={recipe.id}>
                      <RecipeElement
                        recipeID={recipe.id}
                        imagePath={recipe.image_url}
                        title={recipe.name}
                        description={recipe.description}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          </section>
        </section>
      </div>
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
