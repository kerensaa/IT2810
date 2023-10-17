import { useEffect, useState } from "react";

interface Ratings {
    [title: string]: number;
  }

function RatingsDB() {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const openDB = indexedDB.open("ratingsDatabase", 1);
    openDB.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      if (!db.objectStoreNames.contains("ratings")) {
        db.createObjectStore("ratings", { keyPath: "title" });
      } 

    };

    openDB.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["ratings"], "readonly");
      const objectStore = transaction.objectStore("ratings");
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const ratingsMap = {};
        request.result.forEach((item) => {
          ratingsMap[item["title"]] = item.value;
          
        });
        
        setRatings(ratingsMap);
      };
    };
  }, []);

  const toggleRatings = (title: string, value: number) => { 
    const openDB = indexedDB.open("ratingsDatabase", 1);

    openDB.onerror = (event) => {
      console.error("Error opening IndexedDB:", (event.target as IDBRequest).error);
    };

    openDB.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      const transaction = db.transaction(["ratings"], "readwrite");
      const objectStore = transaction.objectStore("ratings");

      if (ratings[title] === value) {
        // Do nothing

      } else {
        const newItem = { title, value };
        objectStore.put(newItem);
        setRatings({ ...ratings, [title]: value });
      }
    };
  };
  return { ratings, toggleRatings };
}

export default RatingsDB;
