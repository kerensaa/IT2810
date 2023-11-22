import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import paginationReducer from './paginationReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  pagination: paginationReducer,
});

export default rootReducer;
