import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';


//API Key: 846b803ab28441449ebbb13144f762bc

const Wine = () => {
  return(
    <div>
      <Navbar/>
      <div className='wine'>
      <h1>Wine Pairings & Recommendations </h1>
      <Link to='/wine/recommend-wine'><button> I have a dish, recommend a wine. </button></Link>
      <Link to='/wine/recommend-dish'><button> I have the wine, recommend a dish. </button></Link>
      <Link to='/wine/recommend-brand'><button> Recommend a brand of wine. </button></Link>
      </div>
    </div>
  )
}

export default Wine;


/*
3 different APIs being used (1 component for each), this will be the main wine component with 3 button selectors to choose from

start with a loadWine thunk to load all wines on the main component. then this can be passed down as props to the MUI autocomplete for each child component below. 

1. Wine Pairing API: input the food type and the response is a type of wine that pairs well with it.
  - need to create a drop down selector input field for the food type (string)
  - need additional input fields for additional (optional) parameters as needed (maxPrice)
  - need to store that string as a variable somewhere (or req.body.query)
  - then need to do API call with that input string as the query parameter: https://api.spoonacular.com/food/wine/pairing?food=${req.body.query}
  - api call is in the wine api routes folder
  - called in redux store wine reducer

2. Dish Pairing for Wine API: input the kind of wine and the response is the types of food that go well with it.
  - need to create an input field for the wine type (string) (or drop down select)
  - need additional input fields for additional (optional) parameters as needed
  - need to store that string as a variable somewhere (or req.body.query)
  - need to do API call with that input string as the query parameter: https://api.spoonacular.com/food/wine/dishes?wine=${req.body.query}
  - api call is in the wine api routes folder
  -called in redux store wine reducer

3. Wine Recommendation API: input is a type of wine and the response is a specific brand of that wine type. 
  - need to create an input field for the wine type (string) (or drop down selector for entire list from Wine Guide?)
  - need additional input fields for additional (optional) parameters as needed (maxPrice, minRating, number)
  - need to store that string as a variable somewhere (or req.body.query)
  - need to do API call with that input string as the query parameter: https://api.spoonacular.com/food/wine/recommendation?wine=${req.body.query}&number=100 (always 100 (max number) to get all results)
  - api call is in the wine api routes folder
  -called in redux store wine reducer

*/