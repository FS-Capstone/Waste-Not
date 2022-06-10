import axios from "axios";
// import { API_KEY } from "../secrets";
import secret from "../secrets";
const API_KEY = secret.API_KEY;

const FETCH_RECIPES = "FETCH";

const _fetchRecipes = (recipes) => ({ type: FETCH_RECIPES, recipes });

export const fetchRecipes = (ingredients) => {
  return async (dispatch) => {
    const ingredientString = ingredients.map(ingredient => ingredient.name).join(',');
    const recipes = (
      await axios.get('/api/search/byIngredients', {
        params:{
          ingredients: ingredientString,
          number: '12',
          ignorePantry: true,
          ranking: '1'
        }
      })
    ).data;
    dispatch(_fetchRecipes(recipes));
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}
