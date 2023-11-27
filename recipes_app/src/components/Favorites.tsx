import Heart from './Heart';
import '../styling/HeartButton.css';
import useIndexedDBFavorites from './FavoritesDB';

function Favorite({ title }: { title: string }) {
  const { favorites, toggleFavorite } = useIndexedDBFavorites();
  const isFavorited = favorites.includes(title);

  return (
    <>
      <button
        aria-label="favorite"
        id="favorite-button"
        className={`h-container${isFavorited ? ' favorited' : ''}`}
        onClick={() => toggleFavorite(title)}
      >
        <Heart></Heart>
      </button>
    </>
  );
}

export default Favorite;
