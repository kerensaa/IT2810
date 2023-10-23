export const fetchAllRecipes = async (): Promise<any> => {
    const response = await fetch('http://localhost:5000/recipe');
    const data = await response.json();
    console.log("Fetched data from API:", data);
    return data;
  };
  
