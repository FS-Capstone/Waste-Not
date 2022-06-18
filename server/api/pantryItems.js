const router = require('express').Router()
const { models: { PantryItem, User, Pantry, Ingredient }} = require('../db')
module.exports = router

const isLoggedIn = async(req, res, next) => {
  try{
    req.user = User.findByToken(req.headers.authorization)
    next()
  }
  catch(ex){
    next(ex)
  }
}

router.get('/:pantryId', isLoggedIn, async(req, res, next)=> {
  try{
    const pantryItems = await PantryItem.findAll({where: {pantryId: req.params.pantryId}});
    res.send(pantryItems)
  }
  catch(ex){
    next(ex)
  }
});

router.post('/:pantryId', isLoggedIn, async(req, res, next)=> {
  try{
    const pantry = await Pantry.findByPk(req.params.pantryId);
    const ingredient = await Ingredient.findByPk(req.body.itemId);
    await pantry.addIngredient(ingredient);
    res.sendStatus(201)
  }
  catch(ex){
    next(ex)
  }
})