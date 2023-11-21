import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { fetchRecipes } from '../api';
import LandingPageTemplate from '../components/LandingPageTemplate';
import useIndexedDBRatings from '../components/RatingsDB';
import '../styling/BackButton.css';
import { RecipeType } from '../types';

interface Ratings {
  [title: string]: number;
}

export default function MyRatings() {
  const navigate = useNavigate();
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
    navigate('/');
  };

  return (
    <>
      <div className="container">
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>
        <h1 className="headline">My ratings</h1>
      </div>
      <div className="landingPage">
        <LandingPageTemplate dataSource={ratedRecipes} sortingOption={''} showSection={false} filterOption={''} />
      </div>
    </>
  );
}
