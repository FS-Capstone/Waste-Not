const router = require('express').Router()
module.exports = router


router.use('/users', require('./users'))
router.use('/ingredients', require('./ingredients'))
router.use('/users', require('./users'));
router.use('/pantry', require('./pantry'));
router.use('/users', require('./users'))
router.use('/ingredients', require('./ingredients'))
router.use('/pantryItems', require('./pantryItems'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
