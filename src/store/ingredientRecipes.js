import axios from "axios";
const FETCH_RECIPES = "FETCH_RECIPES";
const FETCH_MORE_RECIPES = 'FETCH_MORE_RECIPES';
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';


const _fetchRecipes = (recipes) => ({ type: FETCH_RECIPES, recipes });
const _fetchMoreRecipes = recipes => ({type: FETCH_MORE_RECIPES, recipes})
        
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

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
    recipes: []
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
      return action.recipes
    default:
      return state;
  }
}
