// export const fetchAllRecipes = async (): Promise<any> => {
//   const response = await fetch('http://localhost:5000/recipe');
//   return await response.json();
// };

export const fetchRecipeById = async (id: number): Promise<any> => {
  const response = await fetch(`http://localhost:5000/recipe/${id}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

// export const fetchRecipes = async (sortOption?: string): Promise<any> => {
//   let endpoint = 'http://localhost:5000/recipe';
//   if (sortOption) {
//     endpoint += `?sort=${sortOption}`;
//   }
//   const response = await fetch(endpoint);
//   return await response.json();
// };

export const fetchRecipes = async (sortOption?: string): Promise<any> => {
  const endpoint = `http://localhost:5000/recipe${sortOption ? `?sort=${sortOption}` : ''}`;
  const response = await fetch(endpoint);
  return await response.json();
};

export const fetchRecipesFilter = async (filterOptions?: string[]): Promise<any> => {
  // Define the base endpoint for your recipes API
  let endpoint = 'http://localhost:5000/recipe';

  // Create an array to store query parameters
  const queryParams: string[] = [];

  // Add filter options to the query parameters if they are provided
  if (filterOptions && filterOptions.length > 0) {
    filterOptions.forEach((filterOption) => {
      queryParams.push(`category=${filterOption}`);
    });
  }

  // If there are query parameters, join them with '&' and append to the endpoint
  if (queryParams.length > 0) {
    endpoint += `?${queryParams.join('&')}`;
  }

  // Perform the fetch request
  const response = await fetch(endpoint);
  return await response.json();
};
