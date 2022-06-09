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

router.get('/:id', async(req, res, next) => {
  try{
    const ingredient = await Ingredient.findByPk(req.params.id);
    res.send(ingredient);
  }
  catch(error){

  }
})