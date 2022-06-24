import axios from 'axios';
import { getSelectedPantry } from './selectedPantry';
import { localPantry } from './selectedPantry';
import { me } from './auth';
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

//Adds single ingredient to local storage 'selected'
const selectIngredient = (ingredientId, state) => {
  const ingredient = state.ingredients.find(ingredient => ingredient.id === ingredientId);
  const currentlySelected = JSON.parse(window.localStorage.getItem('selectedIngredients'));
  currentlySelected.push(ingredient.name);
  window.localStorage.setItem('selectedIngredients', JSON.stringify(currentlySelected));

}

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

export const addMultiplePantryItems = (ingredients, pantryId) => {
  return async(dispatch)=>{
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    await Promise.all(ingredients.map(async(itemId)=> {
      await axios.post(`/api/pantryItems/${pantryId}`, {itemId}, auth)
    }));
    dispatch(getPantries())
    dispatch(getSelectedPantry())
  }
}


const deselectIngredient = (ingredientId, state) => {
  const ingredient = state.ingredients.find(ingredient => ingredient.id === ingredientId);
  let currentlySelected = JSON.parse(window.localStorage.getItem('selectedIngredients'));
  currentlySelected = currentlySelected.filter(selectedIngredient => selectedIngredient !== ingredient.name);
  window.localStorage.setItem('selectedIngredients', JSON.stringify(currentlySelected));
}

export const deletePantryItem = (ingredientId, selectedPantry) => {

  return async (dispatch, getState) => {
    deselectIngredient(ingredientId, getState());
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

export const editPantryName = (pantry, newName) => {
  return async (dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const newPantries = (await axios.put(`/api/pantry/${pantry.id}`, {newName}, auth)).data
    dispatch({
      type: GET_PANTRIES,
      pantries: newPantries
    })
    dispatch(getSelectedPantry());
  }
}

export const addNewPantry = (name) => {
  return async (dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const newPantries = (await axios.post(`/api/pantry`, {name}, auth)).data;
    dispatch({
      type: GET_PANTRIES,
      pantries: newPantries
    })
  }
}

export const deletePantry = (pantry) => {
  return async (dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}};
    const newPantries = (await axios.delete(`/api/pantry/${pantry.id}`, auth)).data;
    dispatch({
      type: GET_PANTRIES,
      pantries: newPantries
    })
    await dispatch(me());
    dispatch(getSelectedPantry());
  }
}


export default function pantryReducer(state = [], action) {
  if(action.type === GET_PANTRIES)
    return action.pantries;
  return state;
}