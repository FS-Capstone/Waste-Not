import axios from 'axios';

const GET_PANTRIES = 'GET_PANTRIES';

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


export default function pantryReducer(state = [], action) {
  if(action.type === GET_PANTRIES)
    return action.pantries;
  return state;
}