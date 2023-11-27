// api.ts
export const fetchRecipeById = async (id: number): Promise<any> => {
  const query = JSON.stringify({
    query: `{
      recipe(id: ${id}) {
        id
        name
        imageUrl
        description
        course
        prepTime
        ingredients
        instructions
      }
    }`,
  });

  const response = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: query,
  });

  const responseBody = await response.json();
  return responseBody.data.recipe;
};

export const fetchRecipes = async (): Promise<any> => {
  const query = JSON.stringify({
    query: `{
      recipes {
        id
        name
        imageUrl
        description
        course
        prepTime
        ingredients
        instructions
      }
    }`,
  });

  const response = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: query,
  });

  const responseBody = await response.json();
  return responseBody.data.recipes;
};
