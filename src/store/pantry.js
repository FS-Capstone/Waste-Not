import axios from 'axios';

const GET_PANTRIES = 'GET_PANTRIES';
const CLOSE_PANTRY = 'CLOSE_PANTRY';
const OPEN_PANTRY = 'OPEN_PANTRY';

export const getPantries = () => {
  return async(dispatch) => {
    try{
      let pantries
      
      //logged in path
      if(window.localStorage.token){
        pantries = (await axios.get('/api/pantry', {
          headers: {
            authorization: window.localStorage.token
          }
        })).data;
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
    }
    catch(error){
      console.log(error);
    }
  }
}

export const closePantry = () => {
  return{
    type: CLOSE_PANTRY
  }
}

export const openPantry = () => {
  return{
    type: OPEN_PANTRY
  }
}

export default function pantryReducer(state = {items: [], open: false}, action) {
  if(action.type === GET_PANTRIES)
    return {...state, items: action.pantries};
  if(action.type === CLOSE_PANTRY)
    return {...state, open:false};
  if(action.type === OPEN_PANTRY)
    return {...state, open:true};
  return state;
}