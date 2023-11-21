import { Autocomplete, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import RecipeElement from '../components/recipeElement';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import { usePagination } from '../utils/paginationUtils';
import Sorting from './Sorting';
import Filter from './Filtering';
import { useEffect, useState } from 'react';
import { RecipeType } from '../types';

interface LandingPageTemplateProps {
  sortingOption: string;
  filterOption: string;
  onSortChange?: (value: string) => void;
  onFilterChange?: (value: string) => void;
  showSection: boolean;
}

function LandingPageTemplate(props: Readonly<LandingPageTemplateProps>) {
  const elementsPerPage: number = 9;
  const {
    currentPage,
    elementsDisplayed,
    handlePageChange,
    loading,
    totalPages
  } = usePagination(1, elementsPerPage, props.sortingOption, props.filterOption);
  
  // State for handling search within the currently displayed elements
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RecipeType[]>([]);

  useEffect(() => {
    // If searchQuery is not empty, filter the displayed elements
    if (searchQuery) {
      const filtered = elementsDisplayed.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(elementsDisplayed);
    }
  }, [searchQuery, elementsDisplayed]);

  const handleSearchChange = (_event: React.ChangeEvent<{}>, value: string | null) => {
    setSearchQuery(value || '');
  };

  return (
    <>
      {props.showSection && (
        <section className="sort_and_filter">
          <Sorting sortingOption={props.sortingOption} onSortChange={props.onSortChange ?? (() => {})} />
          <Filter courseOption={props.filterOption} onCourseChange={props.onFilterChange ?? (() => {})} />
        </section>
      )}
      <section className={'search_bar'}>
        <label htmlFor="search-box">Search:</label>
        <Autocomplete
          disablePortal
          id="search-box"
          options={elementsDisplayed.map((option) => option.name)}
          onInputChange={handleSearchChange}
          renderInput={(params) => <TextField {...params} label="Search" />}
          freeSolo
          fullWidth
        />
      </section>
      <section className="recipe-grid">
        {loading ? (
          <h1>Loading...</h1>
        ) : searchResults.length === 0 ? (
          <h1>No results found</h1>
        ) : (
          searchResults.map((recipe) => (
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
        <Pagination
          count={totalPages}
          color="secondary"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
          disabled={loading}
        />
      </div>
    </>
  );
}

export default LandingPageTemplate;
