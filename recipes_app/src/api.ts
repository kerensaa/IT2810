import { RecipeType } from "./types";

export const fetchAllRecipes = async (): Promise<any> => {
  const response = await fetch('http://localhost:5000/recipe');
  return await response.json();
};

export const fetchRecipeById = async (id: number): Promise<any> => {
  const response = await fetch(`http://localhost:5000/recipe/${id}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

export const updateRecipe = async (id: number, updatedFields: Partial<RecipeType>): Promise<any> => {
  const response = await fetch(`http://localhost:5000/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedFields)  // Convert the JavaScript object to a string
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

export const postReviewToRecipe = async (id: number, review: { name: string; details: { reviewText: string; rating: number; } }): Promise<any> => {
  const response = await fetch(`http://localhost:5000/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reviews: [review] })  // Wrap review inside an array, to be appended in the backend.
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

  
