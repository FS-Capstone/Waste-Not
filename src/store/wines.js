import axios from 'axios';

// DON'T NEED THIS ANYMORE

//action creators 

const FETCH_BRANDS = 'FETCH_BRANDS';

const _fetchBrands = (brands) => ({ type: FETCH_BRANDS, brands })

// thunks

export const fetchBrands = (wine) => {
    return async function(dispatch) {
        const brands = (await axios.get('/api/wine/recommendedBrands', {
            params: {
                wine: wine,
                maxPrice: '50',
                minRating: '0.8',
                number: '10'
            }
        })).data;
        dispatch(_fetchBrands(brands));
    };
};

// reducer

export default function wineReducer(state = [], action) {
    switch (action.type) {
      case FETCH_BRANDS:
        return action.brands;
      default:
        return state;
    }
  }