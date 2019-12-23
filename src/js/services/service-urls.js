export const LOGIN_URI="http://localhost:5000/api/user/login";
export const SIGNUP_URI="http://localhost:5000/api/user/signup";
export const ALL_RECIPES_URI = (page) => `http://localhost:5000/api/recipes/${page}`;
export const RECIPE_BY_ID_URI = (id) => `http://localhost:5000/api/recipe/${id}`;
export const RECIPE_CATEGORIES_URI =`http://localhost:5000/api/recipe-category`;
export const INGREDIENTS_URI = `http://localhost:5000/api/ingredients`;
export const CREATE_RECIPE_URI = `http://localhost:5000/api/user/create-recipe`;
export const AUTHENTICATED_USER_URI = `http://localhost:5000/api/user`;
export const ADD_FAVORITES_URI = 'http://localhost:5000/api/add-favorite';