/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const LOAD_ITEMS = 'LOAD_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

const _loadItems = (pantryItems) => ({type: LOAD_ITEMS, pantryItems});
const _addItem = (pantryItem) => ({type:ADD_ITEM, pantryItem})

const auth = {headers: {authorization: window.localStorage.getItem('token')}} 

export const loadPantryItems = (pantryId) => {
  return async(dispatch)=>{
    const pantryItems = (await axios.get(`/api/pantryItems/${pantryId}`, auth)).data;
    dispatch(_loadItems(pantryItems))
  }
};

export const addPantryItem = (itemId, pantryId) => {
  return async(dispatch)=>{
    console.log(itemId)
    const newPantryItem = (await axios.post(`/api/pantryItems/${pantryId}`, {itemId}, auth)).data
    console.log(_addItem({newPantryItem}))
    dispatch(_addItem(newPantryItem))
  }
}

export default (state=[], action) => {
  switch(action.type){
    case LOAD_ITEMS:
      return action.pantryItems
    case ADD_ITEM:
      return [...state, action.pantryItem]
    default:
      return state
  }
}