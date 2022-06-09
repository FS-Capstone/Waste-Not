/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const LOAD_SELECTED_PANTRY = 'LOAD_SELECTED_PANTRY'

export const localPantry = () => {
  const localPantry = JSON.parse(window.localStorage.getItem('localPantry'))
  if(localPantry){
    return localPantry;
  }
  else{
    const initialLocalPantry = {
      ingredients: [],
      name: 'Local Pantry',
    }
    window.localStorage.setItem('localPantry', JSON.stringify(initialLocalPantry));
    return initialLocalPantry;
  }
}


export const getSelectedPantry = () => {
  return (dispatch, getState) => {
    //logged in route
    if(getState().auth.id){
      const selectedPantryId = getState().auth.currentlySelectedPantryId;
      const selectedPantry = getState().pantries.find(pantry => pantry.id === selectedPantryId);
      dispatch({
        type: LOAD_SELECTED_PANTRY,
        selectedPantry
      })
    }
    else{

      //logged out route
      dispatch({
        type: LOAD_SELECTED_PANTRY,
        selectedPantry: localPantry()
      })
    }


  }
};


export default (state=[], action) => {
  switch(action.type){
    case LOAD_SELECTED_PANTRY:
      return action.selectedPantry;
    default:
      return state
  }
}