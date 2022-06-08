const router = require('express').Router();
const axios = require('axios');
require('dotenv').config()
module.exports = router

router.get('/byIngredients', async(req, res, next)=> {
  try{
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: req.query.ingredients,
        number: req.query.number,
        ignorePantry: req.query.ignorePantry,
        ranking: req.query.ranking
      },
      headers: {
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.API_KEY
      }
    };
    const recipes = (await axios.request(options)).data;
    console.log(recipes)
    res.send(recipes)
  }
  catch(ex){
    next(ex)
  }
});