import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';

const RecipeListContainer = ({ fetchRecipes, recipes, loading, error }) => {
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  useEffect(() => {
    recipes();
  }, [recipes]);
  useEffect(() => {
    loading();
  }, [loading]);
  useEffect(() => {
    error();
  }, [error]);
};

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  loading: state.recipes.loading,
  error: state.recipes.error,
});

const mapDispatchToProps = {
  fetchRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListContainer);
