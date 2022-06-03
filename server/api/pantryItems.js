const router = require('express').Router()
const { models: { PantryItem, User }} = require('../db')
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
    const newPantryItem = await PantryItem.create(req.body);
    res.send(newPantryItem)
  }
  catch(ex){
    next(ex)
  }
})