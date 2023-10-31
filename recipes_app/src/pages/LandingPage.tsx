import { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { fetchRecipes } from '../api';
import { RecipeType } from '../types';

function LandingPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  // Get sorting option from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialSortOption = urlParams.get('sort') || 'default'; 

  const [sortingOption, setSortingOption] = useState(initialSortOption);

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await fetchRecipes(sortingOption); // For all recipes
        setRecipes(recipes);
    };

    fetchData();
}, [sortingOption]);

  return <LandingPageTemplate dataSource={recipes} sortingOption={sortingOption} onSortChange={setSortingOption} />;
}

export default LandingPage;
