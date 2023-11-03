import { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { fetchRecipes, fetchRecipesFilter } from '../api';
import { RecipeType } from '../types';

function LandingPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [filterRecipes, setFilterRecipes] = useState<RecipeType[]>([]);

  // Get sorting option from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialSortOption = urlParams.get('sort') || 'default';
  const initialFilterOption = urlParams.get('filter') || '';

  const [sortingOption, setSortingOption] = useState(initialSortOption);
  const [filterOption, setFilterOption] = useState(initialFilterOption);

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await fetchRecipes(sortingOption); // For all recipes
      setRecipes(recipes);
    };

    fetchData();
  }, [sortingOption]);

  useEffect(() => {
    const fetchData = async () => {
      const filterRecipes = await fetchRecipesFilter(filterOption);
      setFilterRecipes(filterRecipes);
    };

    fetchData();
  }, [filterOption]);

  return (
    <LandingPageTemplate
      dataSource={recipes}
      sortingOption={sortingOption}
      filterOption={filterOption}
      onSortChange={setSortingOption}
      onFilterChange={setFilterOption}
    />
  );
}

export default LandingPage;
