const router = require('express').Router();
const {models: {User}} = require('../db');
module.exports = router

router.get('/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const shoppingList = user.shoppingList;
    res.send(shoppingList)
  }
  catch(ex){
    next(ex)
  }
});

router.put('/add/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const shoppingList = user.shoppingList
    const newList = shoppingList.push(req.body.item)
    await user.update({shoppingList: newList})
    res.sendStatus(204)
  }
  catch(ex){
    next(ex)
  }
});

router.put('/addMultiple/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const shoppingList = user.shoppingList
    const newList = shoppingList.concat(req.body.itemArr)
    await user.update({shoppingList: newList})
    res.sendStatus(204)
  }
  catch(ex){
    next(ex)
  }
});

router.put('/remove/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const shoppingList = user.shoppingList
    const newList = shoppingList.filter(item => item.id !== req.body.item.id)
    await user.update({shoppingList: newList})
    res.sendStatus(204)
  }
  catch(ex){
    next(ex)
  }
});

router.put('/removeMultiple/:userId', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const shoppingList = user.shoppingList
    const itemIds = req.body.itemArr.map(item => item.id)
    const newList = shoppingList.filter(item => !itemIds.includes(item.id))
    await user.update({shoppingList: newList})
    res.sendStatus(204)
  }
  catch(ex){
    next(ex)
  }
})