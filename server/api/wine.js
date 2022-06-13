const router = require('express').Router();
const axios = require('axios');
require('dotenv').config()
module.exports = router;

// wine type => brand recommendation 

router.get('/recommendedBrands', async (req, res, next) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation',
            params: {
                wine: req.query.wine, // `${value}`
                maxPrice: req.query.maxPrice, 
                minRating: req.query.minRating, 
                number: req.query.number // maybe set a default number? 
            },
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': 'API_KEY_HERE'
            }
          };
          const brands = (await axios.request(options)).data;
          res.send(brands)
    }
    catch(ex) {
        next(ex)
    }
});


// wine type => dish recommendation (returns text description of selected wine and foods)

router.get('/dishPairing', async (req, res, next) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/dishes',
            params: {
                wine: req.query.wine
            },
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': 'API_KEY_HERE'
            }
          };
          const dishes = (await axios.request(options)).data;
          res.send(dishes)
    }
    catch(ex) {
        next(ex)
    }
});

// dish/cousine => wine recommendation (wine pairing)

router.get('/winePairing', async (req, res, next) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing',
            params: {
                food: req.query.food, 
                maxPrice: req.query.maxPrice
            },
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': 'API_KEY_HERE'
            }
          };
          const wines = (await axios.request(options)).data;
          res.send(wines)
    }
    catch(ex) {
        next(ex)
    }
});