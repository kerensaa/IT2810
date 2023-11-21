// const urlPath = "http://it2810-32.idi.ntnu.no:5000/recipe/";
const urlPath = "http://localhost:5000/recipe"

export const fetchRecipeById = async (id: number): Promise<any> => {
  const response = await fetch(`${urlPath}/${id}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchRecipes = async (page: number, limit: number, sortOption?: string, filterOption?: string): Promise<any> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (sortOption) {
    params.append('sort', sortOption);
  }
  if (filterOption && filterOption !== 'default') {
    params.append('course', filterOption);
  }

  const endpoint = `${urlPath}?${params.toString()}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};


