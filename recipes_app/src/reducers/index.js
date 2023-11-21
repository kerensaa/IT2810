import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer'; // You will create reducers like this one

const rootReducer = combineReducers({
  recipes: recipeReducer,
  // ... add other reducers here
});

export default rootReducer;
