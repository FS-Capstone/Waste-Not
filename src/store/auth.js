/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {getPantries} from './pantry';
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const CHANGE_SELECTED_PANTRY = 'CHANGE_SELECTED_PANTRY'
/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}


const selectIngredients = (ingredients) => {
  const ingredientNames = ingredients.map(ingredient => ingredient.name);
  window.localStorage.setItem('selectedIngredients', JSON.stringify(ingredientNames));
}

export const authenticate = ({username, password, formName: method, navigate, email}) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, email})
    window.localStorage.setItem(TOKEN, res.data.token)
    await dispatch(me())
    await navigate('/');
    await dispatch(getPantries());
    selectIngredients(getState().selectedPantry.ingredients);
  } catch (authError) {
    return dispatch(setAuth({error: authError}));
  }
}

export const logout = () => {
  return async function(dispatch, getState){
    window.localStorage.removeItem(TOKEN)
    await dispatch( {
      type: SET_AUTH,
      auth: {}
    })
    await dispatch(getPantries());
    selectIngredients(getState().selectedPantry.ingredients);
  }

}

export const changeUsername = (newUsername) => {
  return async function(dispatch){
    const auth = {headers: {authorization: window.localStorage.getItem('token')}}
    const user = (await axios.put('/auth/changeUsername', {newUsername}, auth)).data;
    dispatch({
      type: SET_AUTH,
      auth: user
    })
  }
}

export const changePassword = (oldPassword, newPassword) => {
  return async (dispatch, getState) => {
    let user = {
      username: getState().auth.username,
      password: oldPassword,
      newPassword
    }
    user  = (await axios.put('/auth/changePassword', user)).data;

    return dispatch({
      type: SET_AUTH,
      auth: user
    })
  }

  
}


export const changeSelectedPantry = (newSelectedPantryId) => {
  return async(dispatch, getState) => {
    try{
      const updatedUser = (await axios.put('/api/pantry/changeSelectedPantry', {newSelectedPantryId}, {
        headers: {
          authorization: window.localStorage.token
        }
      })).data
      
      await dispatch({
        type: CHANGE_SELECTED_PANTRY,
        auth: updatedUser
      })
      selectIngredients(getState().selectedPantry.ingredients);
    }
    catch(error){
      console.log(error);
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case CHANGE_SELECTED_PANTRY:
      return action.auth
    default:
      return state
  }
}
