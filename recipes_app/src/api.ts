import { RecipeType } from './types';

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

export const fetchSortedbyName = async (): Promise<RecipeType[]> => {
  const response = await fetch('http://localhost:5000/recipe?sort=name');
  return await response.json();
};

export const fetchSortedbyTime = async (): Promise<RecipeType[]> => {
  const response = await fetch('http://localhost:5000/recipe?sort=prep_time');
  return await response.json();
};
