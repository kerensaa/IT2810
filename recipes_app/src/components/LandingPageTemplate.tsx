import { Autocomplete, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import RecipeElement from '../components/recipeElement';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import { RecipeType } from '../types';
import { usePagination } from '../utils/paginationUtils';
import Sorting from './Sorting';
import Filter from './Filtering';

interface LandingPageTemplateProps {
  dataSource: RecipeType[];
  sortingOption: string;
  filterOption: string;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

function LandingPageTemplate(props: LandingPageTemplateProps) {
  const [searchResults, setSearchResults] = useState(props.dataSource);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setSearchResults(props.dataSource);
  }, [props.dataSource]);

  // pagination state, variables, and functions
  const elementsPerPage: number = 9;
  const { currentPage, elementsDisplayed, handlePageChange } = usePagination(1, elementsPerPage, searchResults);

  function SearchFunction(values: string | null) {
    if (typeof values === 'string' && values !== null) {
      const recipeResults = props.dataSource.filter((recipe) =>
        recipe.name.toLowerCase().includes(values.toLowerCase()),
      );
      setSearchResults(recipeResults);
      setNoResults(recipeResults.length === 0);
    } else {
      setSearchResults(props.dataSource);
      setNoResults(false);
    }
  }

  return (
    <>
      <section className="sort_and_filter">
        <Sorting sortingOption={props.sortingOption} onSortChange={props.onSortChange} />
        <Filter courseOption={props.filterOption} onCourseChange={props.onFilterChange} />
      </section>
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
        {searchResults.length === 0 ? (
          <h1>{noResults ? 'No results' : 'Loading...'}</h1>
        ) : (
          elementsDisplayed.map((recipe) => (
            <div className="recipe-element" key={recipe.id}>
              <RecipeElement
                recipeID={recipe.id}
                imagePath={recipe.image_url}
                title={recipe.name}
                description={recipe.description}
                preptime={recipe.prep_time}
              />
            </div>
          ))
        )}
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
