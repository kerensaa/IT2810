import { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { fetchRecipes } from '../api';
import { RecipeType } from '../types';

function LandingPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  // Get sorting option from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialSortOption = urlParams.get('sort') || 'default'; 
  const initialFilterOption = urlParams.get('course') || 'default'; 

  const [sortingOption, setSortingOption] = useState(initialSortOption);
  const [filterOption, setFilterOption] = useState(initialFilterOption);

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await fetchRecipes(sortingOption, filterOption); // For all recipes
        setRecipes(recipes);
    };

    fetchData();
}, [sortingOption, filterOption]);

  return <LandingPageTemplate 
    dataSource={recipes} 
    sortingOption={sortingOption} 
    onSortChange={setSortingOption} 
    filterOption={filterOption}
    onFilterChange={setFilterOption}
    />;

}

export default LandingPage;
