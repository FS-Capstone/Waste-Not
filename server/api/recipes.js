const router = require('express').Router();
const axios = require('axios');
module.exports = router;
const { models: { Recipe, User }} = require('../db')

router.post('/createRecipe', async (req, res, next) => {
    try {
    const newRecipe = {
        title: req.body.title,
        cuisine: req.body.cuisine,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        createdByUser: true,
    }
    res.send(await Recipe.create(newRecipe))
    }
    catch(ex){
        next(ex)
    }
});