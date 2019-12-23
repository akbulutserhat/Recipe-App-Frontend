import {recipeConstants} from '../constants';
export function recipes(state={},action) {
    switch(action.type) {
        case recipeConstants.GETALL_RECIPES_REQUEST: 
            return {loading: true, page: action.page, ...state};
        case recipeConstants.GETALL_RECIPES_SUCCESS:
            return {totalPage: action.recipes.totalPage, pagingOffSet: action.recipes.pagingOffSet,
                 result: action.recipes.result};
        case recipeConstants.GETALL_RECIPES_FAILURE:
            return {};

        case recipeConstants.GET_RECIPE_REQUEST:
            return {loading: true, id: action.id};
        case recipeConstants.GET_RECIPE_SUCCESS:
            return {recipe: action.recipe};
        case recipeConstants.GET_RECIPE_FAILURE:
            return {};
        
        default: 
            return state;
    }
}

export function authenticatedUserRecipes(state={}, action) {
    switch(action.type) {
        case recipeConstants.GETALL_USER_RECIPES_REQUEST: 
        return {loading: true, page: action.page, ...state};
    case recipeConstants.GETALL_USER_RECIPES_SUCCESS:
        return {totalPage: action.recipes.totalPage, pagingOffSet: action.recipes.pagingOffSet,
             result: action.recipes.result};
    case recipeConstants.GETALL_USER_RECIPES_FAILURE:
        return {};
    default: 
        return state;
    }
}

export function recipeCategories(state={}, action) {
    switch(action.type) {
           
        case recipeConstants.GET_RECIPE_CATEGORIES_REQUEST: 
            return {loading: true, ...state};
        case recipeConstants.GET_RECIPE_CATEGORIES_SUCCESS:
            return {categories: action.categories};
        case recipeConstants.GET_RECIPE_CATEGORIES_FAILURE:
            return {};
        default: 
            return state;
    }
}

export function recipeIngredients(state={},action) {
    switch(action.type) {
        case recipeConstants.GETALL_INGREDIENTS_REQUEST:
            return {loading: true, ...state};
        case recipeConstants.GETALL_INGREDIENTS_SUCCESS:
            return {ingredients: action.ingredients};
        case recipeConstants.GETALL_INGREDIENTS_FAILURE: 
            return {};
        default:
            return state;
    }
}

export function createRecipe(state={},action) {
    switch (action.type) {
        case recipeConstants.CREATE_RECIPE_REQUEST:
          return { creating_recipe: true };
        case recipeConstants.CREATE_RECIPE_SUCCESS:
          return {created_recipe: true};
        case recipeConstants.CREATE_RECIPE_FAILURE:
          return {};
        default:
          return state
      }
}
export function deleteRecipe(state={},action) {
    switch (action.type) {
        case recipeConstants.DELETE_RECIPE_REQUEST:
          return { deleting_recipe: true };
        case recipeConstants.DELETE_RECIPE_SUCCESS:
          return {deleted_recipe: true};
        case recipeConstants.DELETE_RECIPE_FAILURE:
          return {};
        default:
          return state
      }
}

export function addFavorites(state={},action) {
    switch(action.type) {
        case recipeConstants.ADD_RECIPE_TO_FAVORITES_REQUEST:
            return {loading: true, loadingId: action.loadingId};
        case recipeConstants.ADD_RECIPE_TO_FAVORITES_SUCCESS: 
            return {added_to_favorites: true, recipeId: action.recipeId}
        case recipeConstants.ADD_RECIPE_TO_FAVORITES_FAILURE:
            return {};
        case recipeConstants.DELETE_RECIPE_FROM_FAVORITES_REQUEST: 
            return {loading: true, loadingId: action.loadingId};
        case recipeConstants.DELETE_RECIPE_FROM_FAVORITES_SUCCESS: 
            return {deleted_from_favorites: true};
        case recipeConstants.DELETE_RECIPE_FROM_FAVORITES_FAILURE: 
            return {};
        default: 
            return state;
    }
}