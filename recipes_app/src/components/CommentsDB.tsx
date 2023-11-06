import { useEffect, useState } from 'react';

function CommentsDB() {
  const [comments, setComments] = useState<{ id: number; recipeId: number; text: string }[]>([]);

  const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const openDB: IDBOpenDBRequest = indexedDB.open('commentsDatabase', 1);

      openDB.onerror = (event: Event) => {
        const target = event.target as IDBOpenDBRequest;
        reject('Database error: ' + target.error);
      };

      openDB.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const target = event.target as IDBOpenDBRequest;
        const db = target.result;

        if (db && !db.objectStoreNames.contains('comments')) {
          db.createObjectStore('comments', { autoIncrement: true });
        }
      };

      openDB.onsuccess = (event: Event) => {
        const target = event.target as IDBOpenDBRequest;
        const db = target.result;
        resolve(db);
      };
    });
  };

  useEffect(() => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['comments'], 'readonly');
        const objectStore = transaction.objectStore('comments');
        const request = objectStore.getAll(null);

        transaction.onerror = (event: Event) => {
          const target = event.target as IDBTransaction;
          console.error('Transaction error: ' + target.error);
        };

        request.onsuccess = () => {
          setComments(request.result);
        };
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addComment = (recipeId: number, text: string) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['comments'], 'readwrite');
        const objectStore = transaction.objectStore('comments');

        transaction.onerror = (event) => {
          const target = event.target;
          console.error('Transaction error: ', target);
        };

        const newComment = { recipeId, text };

        const request = objectStore.add(newComment);

        request.onsuccess = () => {
          setComments((prevComments) => [...prevComments, { id: request.result as number, recipeId, text }]);
        };

        request.onerror = (event) => {
          const target = event.target;
          console.error('Error adding comment: ', target);
        };
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteComment = (commentId: number) => {
    console.log('Attempting to delete comment with ID:', commentId);
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['comments'], 'readwrite');
        const objectStore = transaction.objectStore('comments');

        transaction.onerror = (event: Event) => {
          const target = event.target as IDBTransaction;
          console.error('Transaction error: ' + target.error);
        };

        const getRequest = objectStore.get(commentId);

        getRequest.onsuccess = () => {
          const commentToDelete = getRequest.result;

          if (commentToDelete) {
            const deleteRequest = objectStore.delete(commentId);

            deleteRequest.onsuccess = () => {
              // Remove the comment from the state by filtering out the deleted comment
              setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            };
          } else {
            console.error('Comment with ID', commentId, 'not found.');
          }
        };
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { comments, addComment, deleteComment };
}

export default CommentsDB;
