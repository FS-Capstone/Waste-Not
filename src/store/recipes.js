import axios from "axios";
// import { API_KEY } from "../secrets";
import secret from "../secrets";
const API_KEY = secret.API_KEY;

const ADD_RECIPES = "ADD_RECIPES";

const _addRecipes = (recipes) => ({ type: ADD_RECIPES, recipes });

export const addRecipes = (ingredients) => {
  return async (dispatch) => {
    const recipes = (
      await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients[0]},+${ingredients[1]},+${ingredients[2]}&apiKey=${API_KEY}&number=5`
      )
    ).data;
    dispatch(_addRecipes(recipes));
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case ADD_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}
