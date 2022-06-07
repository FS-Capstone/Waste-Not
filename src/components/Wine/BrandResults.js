import React from 'react';
import axios from 'axios';

const BrandResults = (props) => {

const { value } = props

const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation',
    params: {wine: `${value}`, maxPrice: '50', minRating: '0.7', number: '3'},
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      //'X-RapidAPI-Key': '2c60e7f2afmsh5b5cdfa1d63c34dp13b92ejsne26bb848f75d'
    }
  };

  axios.request(options).then(function (response) {
      console.log(response.data);
      console.log(response.data.recommendedWines.length)
    ;  

  }).catch(function (error) {
      console.error(error);
  });


  
return (
    <div>
        <h3> You Selected: </h3>
        { value }
        <div>
            
        </div>
    </div>
)
}

export default BrandResults;