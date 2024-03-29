const router = require('express').Router()
module.exports = router


router.use('/users', require('./users'));
router.use('/ingredients', require('./ingredients'));
router.use('/users', require('./users'));
router.use('/pantry', require('./pantry'));
router.use('/users', require('./users'));
router.use('/ingredients', require('./ingredients'));
router.use('/pantryItems', require('./pantryItems'));
router.use('/search', require('./search'));
router.use('/recipes', require('./recipes'))
router.use('/wine', require('./wine'));
router.use('/shoppingList', require('./shoppingList'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
