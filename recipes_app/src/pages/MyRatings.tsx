import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api';
import LandingPageTemplate from '../components/LandingPageTemplate';
import useIndexedDBRatings from '../components/RatingsDB';
import '../styling/BackButton.css';
import { RecipeType } from '../types';

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
    };

    fetchData();
  }, []);
  const ratedRecipes = recipes.filter((recipe) => (ratings as Ratings)[recipe.name]);
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
          <h1> My ratings</h1>
        </div>
      </div>
      <LandingPageTemplate dataSource={ratedRecipes} sortingOption={''} showSection={false} filterOption={''} />
    </>
  );
}
