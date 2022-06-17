/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const LOAD_SHOPPING_LIST = 'LOAD_SHOPPING_LIST';
const ADD_SHOPPING_ITEM = 'ADD_SHOPPING_ITEM';
const DELETE_SHOPPING_ITEM = 'DELETE_SHOPPING_ITEM';

const _loadShoppingList = shoppingList => ({type: LOAD_SHOPPING_LIST, shoppingList});
const _addShoppingItem = item => ({type: ADD_SHOPPING_ITEM, item});
const _deleteShoppingItem = item => ({type:DELETE_SHOPPING_ITEM, item});

export const loadShoppingList = (userId) => {
  return async(dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const shoppingList = (await axios.get(`/api/shoppingList/${userId}`, auth)).data;
    dispatch(_loadShoppingList(shoppingList));
  }
};

export const addShoppingItem = (item, userId) => {
  return async(dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const newItem = (await axios.put(`/api/shoppingList/add/${userId}`, {item}, auth)).data
    dispatch(_addShoppingItem(newItem));
  }
};

export const deleteShoppingItem = (item, userId) => {
  return async(dispatch) => {
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    await axios.delete(`/api/shoppingList/remove/${userId}`, {item}, auth);
    dispatch(_deleteShoppingItem(item));
  }
};


export default (state=[], action) => {
  switch(action.type){
    case LOAD_SHOPPING_LIST:
      return action.shoppingList
    case ADD_SHOPPING_ITEM:
      return [...state, action.item];
    case DELETE_SHOPPING_ITEM:
      return state.filter(item => item !== action.item)
    default:
      return state
  }
}