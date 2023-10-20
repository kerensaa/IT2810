import useIndexedDBRatings from '../components/RatingsDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { mockUsers } from '../mockData/mockData';

interface Ratings {
  [title: string]: number;
}

export default function MyRatings() {
  const { ratings } = useIndexedDBRatings();
  const ratedRecipes = mockUsers.filter((recipe) => (ratings as Ratings)[recipe.title]);

  return (
    <>
      <h1>My ratings</h1>
      <LandingPageTemplate dataSource={ratedRecipes} />
    </>
  );
}
