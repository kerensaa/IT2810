import { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { fetchAllRecipes } from '../api';
import { RecipeType } from '../types';

function LandingPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRecipes();
      setRecipes(data);
    };

    fetchData();
  }, []);

  return <LandingPageTemplate dataSource={recipes} />;
}

export default LandingPage;
