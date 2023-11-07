export const fetchRecipeById = async (id: number): Promise<any> => {
  const response = await fetch(`http://localhost:5000/recipe/${id}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchRecipes = async (sortOption?: string, filterOption?: string): Promise<any> => {
  let endpoint = 'http://localhost:5000/recipe';
  const params = new URLSearchParams();
  if (sortOption) {
    params.append('sort', sortOption);
  }
  if (filterOption) {
    params.append('course', filterOption);
  }

  endpoint += `?${params.toString()}`;
  const response = await fetch(endpoint);
  return await response.json();
};

