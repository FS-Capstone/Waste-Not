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


router.post('/saveRecipe/:spoonacularId', async (req, res, next) => {
    try{
        const user = await User.findByToken(req.headers.authorization);
        const newRecipe = {
            recipeId: req.params.spoonacularId,
            createdByUser: false,
            userId: user.id
        }
        await Recipe.create(newRecipe);
        res.status(201).send();
    }
    catch(error){
        next(error);
    }
})