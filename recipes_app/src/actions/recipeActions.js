export const fetchRecipes = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_RECIPES_REQUEST' });
    fetch('api/recipes')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: error }));
  };
};
