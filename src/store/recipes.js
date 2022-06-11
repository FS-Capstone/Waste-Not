import axios from "axios";

const FETCH_RECIPES = "FETCH_RECIPES";

const _fetchRecipes = (recipes) => ({ type: FETCH_RECIPES, recipes });

export const fetchRecipes = (ingredients, number, ranking) => {
  return async (dispatch) => {
    const ingredientString = ingredients.map(ingredient => ingredient.name).join(',');
    const recipes = (
      await axios.get('/api/search/byIngredients', {
        params:{
          ingredients: ingredientString,
          number: number,
          ignorePantry: true,
          ranking: ranking
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
