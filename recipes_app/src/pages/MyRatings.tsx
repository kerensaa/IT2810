import { useEffect, useState } from 'react';
import useIndexedDBRatings from '../components/RatingsDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { RecipeType } from '../types';
import { fetchRecipes } from '../api';

interface Ratings {
  [title: string]: number;
}

export default function MyRatings() {
  const { ratings } = useIndexedDBRatings();
  const [recipes, setRecipes] = useState<RecipeType[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
      console.log("Recipes state:", recipes);
    };

    fetchData();
  }, []);
  const ratedRecipes = recipes.filter((recipe) => (ratings as Ratings)[recipe.name]);

  return (
    <>
      <h1>My ratings</h1>
      <LandingPageTemplate dataSource={ratedRecipes} sortingOption={''} onSortChange={function (value: string): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  );
}
