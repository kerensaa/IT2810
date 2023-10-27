import { useEffect, useState } from 'react';
import useIndexedDBRatings from '../components/RatingsDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { RecipeType } from '../types';
import { fetchAllRecipes } from '../api';

interface Ratings {
  [title: string]: number;
}

export default function MyRatings() {
  const { ratings } = useIndexedDBRatings();
  const [recipes, setRecipes] = useState<RecipeType[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRecipes();
      setRecipes(data);
      console.log("Recipes state:", recipes);
    };

    fetchData();
  }, []);
  const ratedRecipes = recipes.filter((recipe) => (ratings as Ratings)[recipe.title]);

  return (
    <>
      <h1>My ratings</h1>
      <LandingPageTemplate dataSource={ratedRecipes} />
    </>
  );
}
