const router = require('express').Router();
module.exports = router;
const { models: { User, Pantry, Ingredient }} = require('../db');




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

router.delete('/:pantryId/:ingredientId', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    const pantry = await Pantry.findByPk(req.params.pantryId);
    await pantry.removeIngredient(req.params.ingredientId);
    const updatedPantries = await user.getPantries();
    
    res.send(updatedPantries).status(204);

  }
  catch(error){
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    const pantry = await Pantry.findByPk(req.params.id)
    pantry.name = req.body.newName;
    await pantry.save();

    res.send(await Pantry.findAll({where: {userId: user.id}, include:[Ingredient]}))
  }
  catch(error){
    next(error);
  }
})

router.post('/', async(req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    await Pantry.create({name: req.body.name, userId: user.id});
    res.send(await Pantry.findAll({where:{userId: user.id}}));
  }
  catch(error){
    next(error);
  }
})

router.delete('/:id', async(req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    await user.removePantryById(req.params.id);
    let allPantries = await Pantry.findAll({where:{userId: user.id}});

    res.send(allPantries)
  }
  catch(error){
    next(error);
  }
})
