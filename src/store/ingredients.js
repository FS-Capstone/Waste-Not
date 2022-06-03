import axios from 'axios';

const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';


const _loadIngredients = (ingredients) => ({type: LOAD_INGREDIENTS, ingredients})

export const loadIngredients = () => {
  return async(dispatch) => {
    const ingredients = (await axios.get('/api/ingredients')).data
    dispatch(_loadIngredients(ingredients))
  }
};

//Store

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch(action.type){
    case LOAD_INGREDIENTS:
      return action.ingredients
    default:
      return state
  }
};