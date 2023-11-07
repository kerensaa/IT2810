import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api';
import useIndexedDBFavorites from '../components/FavoritesDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import '../styling/BackButton.css';
import { RecipeType } from '../types';

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
  const handleGoBack = () => {
    history.back();
  };

  return (
    <>
      <div className="top-container">
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>
        <div className="headline">
          <h1> My favorites</h1>
        </div>
      </div>
      <LandingPageTemplate dataSource={favoritedRecipes} showSection={false} sortingOption={''} filterOption={''} />
    </>
  );
}
