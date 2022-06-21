import axios from "axios";
import { me } from "./auth";
const SET_AUTH = 'SET_AUTH'
const FETCH_RECIPES = "FETCH_RECIPES";
const CREATE_RECIPE = "CREATE_RECIPE"

const _fetchRecipes = (recipes) => ({ type: FETCH_RECIPES, recipes });

export const fetchRecipes = (ingredients, number, ranking) => {
  return async (dispatch) => {
    const ingredientString = ingredients
      .map((ingredient) => ingredient.name)
      .join(",");
    const recipes = (
      await axios.get("/api/search/byIngredients", {
        params: {
          ingredients: ingredientString,
          number: number,
          ignorePantry: true,
          ranking: ranking,
        },
      })
    ).data;
    dispatch(_fetchRecipes(recipes));
  };
};

export const createRecipe = (title, cuisine, prepTime, cookTime, ingredients, instructions, createdByUser, userId) => {
  console.log("in the thunk")
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const newRecipe = (await axios.post('/api/recipes/createRecipe', {
      title, cuisine, prepTime, cookTime, ingredients, instructions, createdByUser, userId
    }, auth)).data;
    dispatch({type: CREATE_RECIPE, newRecipe})
    //await axios.post('/api/recipe/createRecipe', {}, auth);
    //dispatch(me());
  }
}

export const saveRecipe = (recipeId) => {
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
    await axios.post(`/api/recipes/saveRecipe/${recipeId}`, {}, auth);
    dispatch(me());
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
    case CREATE_RECIPE:
      return [...state, action.recipe]
    default:
      return state;
  }
}
