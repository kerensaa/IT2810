import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../api';
import useIndexedDBFavorites from '../components/FavoritesDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import '../styling/BackButton.css';
import { RecipeType } from '../types';

export default function MyFavorites() {
  const navigate = useNavigate();
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
    navigate('/');
  };

  return (
    <>
      <div className="container">
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>
        <h1 className="headline"> My favorites</h1>
      </div>
      <LandingPageTemplate dataSource={favoritedRecipes} showSection={false} sortingOption={''} filterOption={''} />
    </>
  );
}
