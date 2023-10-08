import { useEffect, useState } from "react";

function IndexedDB() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const openDB = indexedDB.open("recipesDatabase", 1);
    openDB.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      db.createObjectStore("favorites", { keyPath: "title" });
      console.log("useeffect");
    };

    openDB.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["favorites"], "readonly");
      const objectStore = transaction.objectStore("favorites");
      const request = objectStore.getAll();

      request.onsuccess = () => {
        setFavorites((request.result as { title: string }[]).map(item => item.title));
        console.log("onsuccess");
      };
    };
  }, []);

  const toggleFavorite = (title: string) => { 
    const openDB = indexedDB.open("recipesDatabase", 1);

    openDB.onerror = (event) => {
      console.error("Error opening IndexedDB:", (event.target as IDBRequest).error);
    };

    openDB.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      const transaction = db.transaction(["favorites"], "readwrite");
      const objectStore = transaction.objectStore("favorites");

      if (favorites.includes(title)) {
        objectStore.delete(title);
        setFavorites(favorites.filter((favorite) => favorite !== title));
        console.log("removefavorites");
      } else {
        const newItem = { title };
        objectStore.add(newItem);
        setFavorites([...favorites, title]);
        console.log("addfavorites");
      }
    };
  };

  return { favorites, toggleFavorite };
}

export default IndexedDB;
