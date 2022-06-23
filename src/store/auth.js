/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

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

export const authenticate = ({username, password, formName: method, navigate, email}) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, email})
    window.localStorage.setItem(TOKEN, res.data.token)
    window.localStorage.setItem('selectedIngredients', JSON.stringify([]))
    dispatch(me())
    navigate('/');
  } catch (authError) {
    return dispatch(setAuth({error: authError}));
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  window.localStorage.setItem('selectedIngredients', JSON.stringify([]))
  return {
    type: SET_AUTH,
    auth: {}
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
  return async(dispatch) => {
    try{
      const updatedUser = (await axios.put('/api/pantry/changeSelectedPantry', {newSelectedPantryId}, {
        headers: {
          authorization: window.localStorage.token
        }
      })).data
      
      dispatch({
        type: CHANGE_SELECTED_PANTRY,
        auth: updatedUser
      })
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
