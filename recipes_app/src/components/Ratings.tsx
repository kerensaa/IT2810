
import { Rate } from "antd";
import useIndexedDBFavorites from "./IndexedDB";

function Favorite({ title }: { title: string }) {
  const { favorites, toggleFavorite } = useIndexedDBFavorites();
//   const isFavorited = favorites.includes(title);

  return (
    <>
      <Rate defaultValue={0} onChange={(value) => toggleFavorite(title, value)}></Rate>
    </>
  );
}

export default Favorite;