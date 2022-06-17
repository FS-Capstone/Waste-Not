const router = require('express').Router();
const {models: {User}} = require('../db');
module.exports = router

router.get('/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id)
    const shoppingList = user.shoppingList;
    res.send(shoppingList)
  }
  catch(ex){
    next(ex)
  }
});

router.put('/add/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk
    const shoppingList = user.shoppingList
    const newList = shoppingList.push(req.body.item)
    await user.update({shoppingList: newList})
    res.send(newList)
  }
  catch(ex){
    next(ex)
  }
})

router.put('/remove/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk
    const shoppingList = user.shoppingList
    const newList = shoppingList.filter(item => item !== req.body.item)
    await user.update({shoppingList: newList})
    res.send(newList)
  }
  catch(ex){
    next(ex)
  }
})