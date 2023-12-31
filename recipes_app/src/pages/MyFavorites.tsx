import { useEffect, useState } from 'react';
import useIndexedDBFavorites from '../components/FavoritesDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { RecipeType } from '../types';
import { fetchRecipes } from '../api';

export default function MyFavorites() {
  const { favorites } = useIndexedDBFavorites();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    fetchData();
  }, []);
  const favoritedRecipes = recipes.filter((recipe) => favorites.includes(recipe.name));

  return (
    <>
      <h1>My favorites</h1>
      <LandingPageTemplate dataSource={favoritedRecipes} showSection={false} sortingOption={''} filterOption={''} />
    </>
  );
}
