import axios from "axios";
import { API_KEY } from "../secrets";

const ADD_RECIPES = "ADD_RECIPES";

const _addRecipes = (recipes) => ({ type: ADD_RECIPES, recipes });

export const addRecipes = (ingredients) => {
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
