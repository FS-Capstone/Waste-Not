const router = require('express').Router();
module.exports = router;
const { models: { User }} = require('../db')



router.get('/', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getPantries());
  }
  catch(error){
    next(error);
  }
})