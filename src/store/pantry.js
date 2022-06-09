import axios from 'axios';
import { getSelectedPantry } from './selectedPantry';
import { localPantry } from './selectedPantry';
const GET_PANTRIES = 'GET_PANTRIES';



export const getPantries = () => {
  return async(dispatch) => {
    try{
      let pantries
      const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
      //logged in path
      if(window.localStorage.token){
        pantries = (await axios.get('/api/pantry', auth )).data;
      }
      
      //logged out path
      else{
        pantries = [];
      }

      dispatch({
        type: GET_PANTRIES,
        pantries
      })
      dispatch(getSelectedPantry());
      
    }
    catch(error){
      console.log(error);
    }
  }
};

export const addPantryItem = (itemId, pantryId) => {
  return async(dispatch, getState)=>{
    //logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
      await axios.post(`/api/pantryItems/${pantryId}`, {itemId}, auth);
      dispatch(getPantries());
    }
    //logged out route
    else{
      const pantry = localPantry();
      const ingredient = (await axios.get(`/api/ingredients/${itemId}`)).data;
      pantry.ingredients.push(ingredient);
      window.localStorage.setItem('localPantry', JSON.stringify(pantry));
      return dispatch(getPantries());
    }

  }
}

export const addMultiplePantryItems = (items, pantryId) => {
  return async(dispatch)=>{
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    await Promise.all(items.map(async(ingredient)=> {
      await axios.post(`/api/pantryItems/${pantryId}`, {ingredient}, auth)
    }));
    const pantries = (await axios.get('/api/pantry', auth)).data
    dispatch({type: GET_PANTRIES, pantries})
  }
}

export const deletePantryItem = (ingredientId, selectedPantry) => {

  return async (dispatch, getState) => {
    //logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
      await axios.delete(`/api/pantry/${selectedPantry}/${ingredientId}`, auth)
  
      dispatch(getPantries());
    }
    //logged out route
    else{
      let pantry = localPantry();
      pantry.ingredients = pantry.ingredients.filter(ingredient => ingredient.id !== ingredientId);
      window.localStorage.setItem('localPantry', JSON.stringify(pantry));
      dispatch(getPantries());
    }
  }

}


export default function pantryReducer(state = [], action) {
  if(action.type === GET_PANTRIES)
    return action.pantries;
  return state;
}