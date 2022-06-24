import axios from "axios";
import { me } from "./auth";
const SET_AUTH = 'SET_AUTH'
const FETCH_RECIPES = "FETCH_RECIPES";
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
const CREATE_RECIPE = "CREATE_RECIPE";
const FETCH_MORE_RECIPES = 'FETCH_MORE_RECIPES';


const _fetchRecipes = (recipes) => ({ type: FETCH_RECIPES, recipes });
const _fetchMoreRecipes = recipes => ({type: FETCH_MORE_RECIPES, recipes})


export const createRecipe = (title, cuisine, prepTime, cookTime, ingredients, instructions, createdByUser, userId) => {
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const newRecipe = (await axios.post('/api/recipes/createRecipe', {
      title, cuisine, prepTime, cookTime, ingredients, instructions, createdByUser, userId
    }, auth)).data;
    //dispatch({type: CREATE_RECIPE, newRecipe});
    dispatch(me());
  }
}

        
 export const fetchRecipes = (ingredients, number, sort) => {
  return async (dispatch) => {
    let ingredientString;
    if(ingredients[0].name){
      ingredientString = ingredients
        .map((ingredient) => ingredient.name)
        .join(",");
    }
    else{
      ingredientString  = ingredients.join(',');
    }
    
    const recipes = (
      await axios.get("/api/search/byIngredients", {
        params: {
          ingredients: ingredientString,
          number: number,
          sort: sort,
        },
      })
    ).data;
    dispatch(_fetchRecipes(recipes));
  };
};

export const fetchMoreRecipes = (ingredients, number, sort, offset) => {
  return async (dispatch) => {
    let ingredientString;
    if(ingredients[0].name){
      ingredientString = ingredients
        .map((ingredient) => ingredient.name)
        .join(",");
    }
    else{
      ingredientString  = ingredients.join(',');
    }
    
    const recipes = (
      await axios.get("/api/search/byIngredients", {
        params: {
          ingredients: ingredientString,
          number: number,
          sort: sort,
          offset: offset
        },
      })
    ).data;
    dispatch(_fetchMoreRecipes(recipes));
  };
};

export const fetchMoreComplexRecipes = obj => {
  Object.keys(obj).forEach(key => obj[key] === '' && delete obj[key])
  return async(dispatch) => {
    const recipes = (
      await axios.get('/api/search/complexSearch', {
        params: obj
      })
    ).data
    dispatch(_fetchMoreRecipes(recipes))
  }
}



export const fetchComplexRecipes = obj => {
  Object.keys(obj).forEach(key => obj[key] === '' && delete obj[key])
  return async(dispatch) => {
    const recipes = (
      await axios.get('/api/search/complexSearch', {
        params: obj
      })
    ).data;
    dispatch(_fetchRecipes(recipes))
  }
}

export const saveRecipe = (recipeId) => {
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
    await axios.post(`/api/recipes/saveRecipe/${recipeId}`, {}, auth);
    dispatch(me());
  }
}

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
    recipes: []
  }
}

export const removeSavedRecipe = (recipeId) => {
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}};
    await axios.delete(`/api/recipes/removeSavedRecipe/${recipeId}`, auth);
    dispatch(me());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.recipes;
    case FETCH_MORE_RECIPES:
      return state.concat(action.recipes)
    case CLEAR_SEARCH_RESULTS:
      return action.recipes;
    case CREATE_RECIPE:
      return [...state, action.recipe]
    default:
      return state;
  }
}
