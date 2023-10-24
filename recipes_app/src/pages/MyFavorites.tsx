import useIndexedDBFavorites from '../components/FavoritesDB';
import LandingPageTemplate from '../components/LandingPageTemplate';
import { mockUsers } from '../mockData/mockData';

export default function MyFavorites() {
  const { favorites } = useIndexedDBFavorites();
  const favoritedRecipes = mockUsers.filter((recipe) => favorites.includes(recipe.title));

  return (
    <>
      <h1>My favorites</h1>
      <LandingPageTemplate dataSource={favoritedRecipes} />
    </>
  );
}
