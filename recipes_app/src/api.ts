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


