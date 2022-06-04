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


router.put('/changeSelectedPantry', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    user.currentlySelectedPantryId = req.body.newSelectedPantryId;
    await user.save();
    res.send(user);
  }
  catch(error){
    next(error);
  }
})