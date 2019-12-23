import axios from 'axios';
import {authHeader} from '../helpers';
export const recipeService = {
    fetchAllRecipes,
    fetchAuthenticatedUserRecipes,
    fetchRecipeByID,
    fetchAllCategories,
    fetchAllIngredients,
    createRecipe,
    addFavorites,
    deleteFromFavorites,
    deleteRecipe
}
function fetchAllRecipes(page) {
    const ALL_RECIPES_URI_PAGE = process.env.REACT_APP_ALL_RECIPES_URI + page;
    console.log(ALL_RECIPES_URI_PAGE);
    return axios.get(ALL_RECIPES_URI_PAGE).then(res => res.data);
}
function fetchAuthenticatedUserRecipes(page) {
    const USER_RECIPES_URI_PAGE = process.env.REACT_APP_USER_RECIPES_URI + page;
    return axios.get(USER_RECIPES_URI_PAGE).then(res => res.data);
}
function fetchRecipeByID(id) {
    const RECIPE_BY_ID_URI_ID = process.env.REACT_APP_RECIPE_BY_ID_URI + id;
    return axios.get(RECIPE_BY_ID_URI_ID).then(res => res.data);
}
function fetchAllCategories() {
    const RECIPE_CATEGORIES_URI = process.env.REACT_APP_RECIPE_CATEGORIES_URI;
    return axios.get(RECIPE_CATEGORIES_URI).then(res => res.data);
}
function fetchAllIngredients() {
    const INGREDIENTS_URI = process.env.REACT_APP_INGREDIENTS_URI;
    return axios.get(INGREDIENTS_URI).then(res => res.data);
}

function createRecipe(recipe) {
    const CREATE_RECIPE_URI = process.env.REACT_APP_CREATE_RECIPE_URI;
    console.log(CREATE_RECIPE_URI);

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
    };
    return axios.post(CREATE_RECIPE_URI,recipe, requestOptions);
}
function addFavorites(id) {
    const ADD_FAVORITES_URI = process.env.REACT_APP_ADD_FAVORITES_URI;
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
    };
    return axios.post(ADD_FAVORITES_URI,{recipeId: id},requestOptions).then(res => res.data);
}
function deleteFromFavorites(id) {
    const DELETE_FROM_FAVORITES_URI = process.env.REACT_APP_DELETE_FROM_FAVORITES_URI;
    console.log(DELETE_FROM_FAVORITES_URI);
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
    };
    return axios.post(DELETE_FROM_FAVORITES_URI,{recipeId: id},requestOptions).then(res => res.data);
}

function deleteRecipe(id) {
    const DELETE_RECIPE_URI = process.env.REACT_APP_DELETE_RECIPE_URI;
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
    };
    return axios.post(DELETE_RECIPE_URI,{recipeId: id},requestOptions).then(res => res.data);
}