const router = require('express').Router()
const { models: { Ingredient }} = require('../db')
module.exports = router

router.get('/', async(req, res, next)=>{
  try{
    const ingredients = await Ingredient.findAll();
    res.send(ingredients)
  }
  catch(ex){
    next(ex)
  }
});