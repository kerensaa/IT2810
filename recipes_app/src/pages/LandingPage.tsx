import { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { fetchAllRecipes } from '../api';
import { ObjectId } from 'bson';

export type Recipe = {
  _id: ObjectId
  id: number;
  title: string;
  ingredients: string;
  description: string;
  icon_path: string;
  rating: string;
  reviewCount: string;
  instructions: string;
  time: string;
};

function LandingPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRecipes();
      setRecipes(data);
      console.log("Recipes state:", recipes);
    };

    fetchData();
  }, []);

  return <LandingPageTemplate dataSource={recipes} />;
}

export default LandingPage;
