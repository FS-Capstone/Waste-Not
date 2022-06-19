/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {me} from './auth';

const LOAD_SHOPPING_LIST = 'LOAD_SHOPPING_LIST';
const ADD_SHOPPING_ITEM = 'ADD_SHOPPING_ITEM';
const ADD_MULTIPLE_SHOPPING_ITEMS = 'ADD_MULTIPLE_SHOPPING_ITEMS';
const DELETE_SHOPPING_ITEM = 'DELETE_SHOPPING_ITEM';

const _loadShoppingList = shoppingList => ({type: LOAD_SHOPPING_LIST, shoppingList});
const _addShoppingItem = item => ({type: ADD_SHOPPING_ITEM, item});
const _addMultipleShoppingItems = itemArr => ({type:ADD_MULTIPLE_SHOPPING_ITEMS, itemArr})
const _deleteShoppingItem = item => ({type:DELETE_SHOPPING_ITEM, item});

export const loadShoppingList = (userId) => {
  return async(dispatch, getState) => {
    // logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}}
      const shoppingList = (await axios.get(`/api/shoppingList/${userId}`, auth)).data;
      dispatch(_loadShoppingList(shoppingList));
    }
    // logged out route
    else{
      const shoppingList = window.localStorage.getItem('shoppingList');
      if(shoppingList){
        dispatch(_loadShoppingList(JSON.parse(shoppingList)))
      }
      else{
        const initialShoppingList = []
        window.localStorage.setItem('shoppingList', JSON.stringify(initialShoppingList));
        dispatch(_loadShoppingList(initialShoppingList))
      }
    }

  }
};

export const addShoppingItem = (data, userId) => {
  return async(dispatch, getState) => {
    // logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}}
      await axios.put(`/api/shoppingList/add/${userId}`, {data}, auth)
      dispatch(_addShoppingItem(data));
    }
    // logged out route
    else {
      const shoppingList = JSON.parse(window.localStorage.getItem('shoppingList'));
      shoppingList.push(data);
      window.localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
      dispatch(_addShoppingItem(data))
    }

  }
};

export const addMultipleShoppingItems = (data, userId) => {
  return async(dispatch, getState) => {
    // logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}}
      await axios.put(`/api/shoppingList/add/${userId}`, {data}, auth)
      dispatch(_addMultipleShoppingItems(data))
    }
    // logged out route
    else{
      const shoppingList = JSON.parse(window.localStorage.getItem('shoppingList'));
      data.forEach(ingredient => shoppingList.push(ingredient));
      window.localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
      dispatch(_addMultipleShoppingItems(data));
    }
  }
}

export const deleteShoppingItem = (item, userId) => {
  return async(dispatch, getState) => {
    // logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}}
      await axios.put(`/api/shoppingList/remove/${userId}`, {item}, auth);
      dispatch(_deleteShoppingItem(item));
    }
    // logged out route
    else {
      const shoppingList = JSON.parse(window.localStorage.getItem('shoppingList'));
      const newShoppingList = shoppingList.filter(_item => _item.id !== item.id);
      window.localStorage.setItem('shoppingList', JSON.stringify(newShoppingList));
      dispatch(_deleteShoppingItem(item))
    }
  }
};

export const deleteMultipleShoppingItems = (itemArr, userId) => {
  return async(dispatch, getState) => {
    // logged in route
    if(getState().auth.id){
      const auth = {headers: {authorization: window.localStorage.getItem('token')}}
      await axios.put(`/api/shoppingList/removeMultiple/${userId}`, {itemArr}, auth)
      // itemArr.forEach(item => dispatch(_deleteShoppingItem(item)))
    }
    // logged out route
    else {
      const shoppingList = JSON.parse(window.localStorage.getItem('shoppingList'));
      const itemIds = itemArr.map(item => item.id)
      const newList = shoppingList.filter(item => !itemIds.includes(item.id));
      window.localStorage.setItem('shoppingList', JSON.stringify(newList));
    }
    itemArr.forEach(item => dispatch(_deleteShoppingItem(item)))
  }
}


export default (state=[], action) => {
  switch(action.type){
    case LOAD_SHOPPING_LIST:
      return action.shoppingList
    case ADD_SHOPPING_ITEM:
      return [...state, action.item];
    case ADD_MULTIPLE_SHOPPING_ITEMS:
      return [...state].concat(action.itemArr)
    case DELETE_SHOPPING_ITEM:
      return state.filter(item => item.id !== action.item.id)
    default:
      return state
  }
}