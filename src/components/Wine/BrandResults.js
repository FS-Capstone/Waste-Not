import React from 'react';
import axios from 'axios';

//const API_KEY = process.env.REACT_APP_API_KEY

const BrandResults = (props) => {

const { value } = props

const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation',
    params: {wine: `${value}`, maxPrice: '50', minRating: '0.7', number: '3'},
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'API KEY HERE'
    }
  };

//  const results = axios.request(options).catch(function (error) {
//       console.error(error);
//   });

 axios.request(options).then(function (response) {
	console.log(response.data);
    console.log(response.data.recommendedWines)
    
}).catch(function (error) {
	console.error(error);
});

//const results = response.data.recommendedWines
  
return (
    <div>
        <h3> You Selected: </h3>
        { value }
        <div>
            {/* { results.map(result => { 
                return (
                <li> {result.title} </li>
                )
            }) } */}
        </div>
    </div>
)
}

export default BrandResults;