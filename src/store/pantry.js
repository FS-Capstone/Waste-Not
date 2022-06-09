import axios from 'axios';
import { getSelectedPantry } from './selectedPantry';

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
        //TODO: set up local storage pantry for
        //logged out user
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
  return async(dispatch)=>{
    const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
    await axios.post(`/api/pantryItems/${pantryId}`, {itemId}, auth);
    const pantries = (await axios.get('/api/pantry', auth)).data;
    dispatch({type: GET_PANTRIES, pantries})
  }
}

export const deletePantryItem = (ingredientId, selectedPantry) => {

  return async (dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}} 
    const updatedPantries = (await axios.delete(`/api/pantry/${selectedPantry}/${ingredientId}`, auth)).data;

    dispatch({
      type: GET_PANTRIES,
      pantries: updatedPantries
    })
  }

}


export default function pantryReducer(state = [], action) {
  if(action.type === GET_PANTRIES)
    return action.pantries;
  return state;
}