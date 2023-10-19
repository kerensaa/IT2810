import { useEffect, useState } from 'react';

function CommentsDB() {
  const [comments, setComments] = useState<{ id: number; recipeId: number; text: string }[]>([]);

  useEffect(() => {
    const openDB = indexedDB.open('commentsDatabase', 1);

    openDB.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      if (!db.objectStoreNames.contains('comments')) {
        db.createObjectStore('comments', { autoIncrement: true });
      }
    };

    openDB.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(['comments'], 'readonly');
      const objectStore = transaction.objectStore('comments');
      const request = objectStore.getAll();

      request.onsuccess = () => {
        setComments(request.result);
      };
    };
  }, []);

  const addComment = (recipeId: number, text: string) => {
    const openDB = indexedDB.open('commentsDatabase', 1);

    openDB.onerror = (event) => {
      console.error('Error opening IndexedDB:', (event.target as IDBRequest).error);
    };

    openDB.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      const transaction = db.transaction(['comments'], 'readwrite');
      const objectStore = transaction.objectStore('comments');

      const newComment = { recipeId, text };

      const request = objectStore.add(newComment);

      request.onsuccess = () => {
        setComments([...comments, { id: request.result, recipeId, text }]);
      };
    };
  };

  return { comments, addComment };
}

export default CommentsDB;
