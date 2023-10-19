import RecipeElement from '../components/recipeElement';
import { mockUsers } from '../mockData/mockData';
import '../styling/LandingPage.css';
import '../styling/recipeElement.css';
import { Input } from 'antd';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../utils/paginationUtils';

function LandingPage() {
  const { Search } = Input;

  // pagination state, variables and functions
  const elementsPerPage: number = 3;
  const { currentPage, elementsDisplayed, handlePageChange } = usePagination(1, elementsPerPage, mockUsers);

  return (
    <>
      <h1></h1>
      <Search placeholder="Search" style={{ paddingTop: 40, maxWidth: 600 }} />
      <section className="recipe-grid">
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
      </section>
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(mockUsers.length / elementsPerPage)}
          color="secondary"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default LandingPage;
