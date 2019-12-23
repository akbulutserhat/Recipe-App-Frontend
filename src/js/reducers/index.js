import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users,authenticatedUser} from './users.reducer';
import { alert } from './alert.reducer';
import {recipes, authenticatedUserRecipes, recipeCategories, recipeIngredients, createRecipe, addFavorites} from './recipe.reducer';
const rootReducer = combineReducers({
  authentication,
  registration,
  authenticatedUser,
  users,
  alert,
  recipes,
  authenticatedUserRecipes,
  recipeCategories,
  recipeIngredients,
  createRecipe,
  addFavorites
});

export default rootReducer;