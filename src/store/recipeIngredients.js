/* eslint-disable import/no-anonymous-default-export */
const SAVE_INGREDIENTS = 'SAVE_INGREDIENTS';
const FETCH_RECIPE_INGREDIENTS = 'FETCH_RECIPE_INGREDIENTS'

const _saveIngredients = ingredients => ({type: SAVE_INGREDIENTS, ingredients})
const _fetchRecipeIngredients = () => ({type: FETCH_RECIPE_INGREDIENTS})

export const saveIngredients = ingredients => {
  return (dispatch) => {
    dispatch(_saveIngredients(ingredients))
  }
};

export const fetchRecipeIngredients = () => {
  return(dispatch) => {
    dispatch(_fetchRecipeIngredients())
  }
}

export default (state ={}, action) => {
  switch(action.type){
    case SAVE_INGREDIENTS:
      return action.ingredients
    case FETCH_RECIPE_INGREDIENTS:
      return state
    default:
      return state
  }
}