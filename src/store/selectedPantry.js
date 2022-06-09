/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const LOAD_SELECTED_PANTRY = 'LOAD_SELECTED_PANTRY'
// const LOAD_ITEMS = 'LOAD_ITEMS';
// const ADD_ITEM = 'ADD_ITEM';

// const _loadItems = (pantryItems) => ({type: LOAD_ITEMS, pantryItems});
// const _addItem = (pantryItem) => ({type:ADD_ITEM, pantryItem})

// const auth = {headers: {authorization: window.localStorage.getItem('token')}} 

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
        selectedPantry: {}
      })
    }


  }

  // return async(dispatch)=>{
  //   const pantryItems = (await axios.get(`/api/pantryItems/${pantryId}`, auth)).data;
  //   dispatch(_loadItems(pantryItems))
  // }
};

// export const addPantryItem = (itemId, pantryId) => {
//   return async(dispatch)=>{
//     console.log(itemId)
//     const newPantryItem = (await axios.post(`/api/pantryItems/${pantryId}`, {itemId}, auth)).data
//     console.log(_addItem({newPantryItem}))
//     dispatch(_addItem(newPantryItem))
//   }
// }

export default (state=[], action) => {
  switch(action.type){
    case LOAD_SELECTED_PANTRY:
      return action.selectedPantry;
    default:
      return state
  }
}