// const urlPath = "http://it2810-32.idi.ntnu.no:5000/recipe/";
const urlPath = "http://localhost:5000/recipe"


export const fetchRecipeById = async (id: number): Promise<any> => {
  const response = await fetch(urlPath + `${id}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchRecipes = async (sortOption?: string, filterOption?: string): Promise<any> => {
  let endpoint = urlPath;
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

  
