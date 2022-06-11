import React from 'react';


const BrandResults = () => {

// const options = {
//     method: 'GET',
//     url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation',
//     params: {wine: `${value}`, maxPrice: '50', minRating: '0.7', number: '3'},
//     headers: {
//       'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//       'X-RapidAPI-Key': 'API KEY HERE'
//     }
//   };

//  axios.request(options).then(function (response) {
// 	console.log(response.data);
//     console.log(response.data.recommendedWines)
    
// }).catch(function (error) {
// 	console.error(error);
// });

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