import axios from "axios";
import { me } from "./auth";
const SET_AUTH = 'SET_AUTH'
const FETCH_RECIPES = "FETCH_RECIPES";

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

export const saveRecipe = (recipeId) => {
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
    await axios.post(`/api/recipes/saveRecipe/${recipeId}`, {}, auth);
    dispatch(me());


  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}
