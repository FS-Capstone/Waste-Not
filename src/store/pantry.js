import axios from 'axios';

const GET_PANTRIES = 'GET_PANTRIES';

const auth = {headers: {authorization: window.localStorage.getItem('token')}} 

export const getPantries = () => {
  return async(dispatch) => {
    try{
      let pantries
      
      //logged in path
      if(window.localStorage.token){
        pantries = (await axios.get('/api/pantry', auth)).data;
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
};

export const addPantryItem = (itemId, pantryId) => {
  return async(dispatch)=>{
    await axios.post(`/api/pantryItems/${pantryId}`, {itemId}, auth);
    const pantries = (await axios.get('/api/pantry', auth)).data;
    dispatch({type: GET_PANTRIES, pantries})
  }
}


export default function pantryReducer(state = [], action) {
  if(action.type === GET_PANTRIES)
    return action.pantries;
  return state;
}