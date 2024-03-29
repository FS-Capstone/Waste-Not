const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
module.exports = router;

router.get("/byIngredients", async (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        instructionsRequired: 'true',
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        ignorePantry: 'true',
        number: req.query.number,
        sort: req.query.sort,
        sortDirection: 'asc',
        offset: req.query.offset,
        includeIngredients: req.query.ingredients
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    const recipes = (await axios.request(options)).data;
    res.send(recipes.results);
  } catch (ex) {
    next(ex);
  }
});

router.get('/complexSearch', async(req, res, next) => {
  try{
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        query: req.query.query,
        cuisine: req.query.cuisine,
        type: req.query.type,
        diet: req.query.diet,
        intolerances: req.query.intolerances,
        excludeIngredients: req.query.excludeIngredients,
        instructionsRequired: 'true',
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        ignorePantry: 'true',
        number: req.query.number,
        maxReadyTime: req.query.maxReadyTime,
        offset: req.query.offset
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    const recipes = (await axios.request(options)).data;
    res.send(recipes.results);
  }
  catch(ex){
    next(ex)
  }
})

router.get("/byRecipeId/:id", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/analyzedInstructions`,
      params: { stepBreakdown: "true" },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    const recipe = (await axios.request(options)).data;
    res.send(recipe);
  } catch (ex) {
    next(ex);
  }
});

router.get("/nutritionById/:id/", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`,
      params: { stepBreakdown: "true", includeNutrition: true },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    const recipe = (await axios.request(options)).data;
    res.send(recipe);
  } catch (ex) {
    next(ex);
  }
});

router.get("/equipmentById/:id/", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/equipmentWidget.json`,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    const equipment = (await axios.request(options)).data;
    res.send(equipment);
  } catch (ex) {
    next(ex);
  }
});

router.get("/nutritionLabelById/:id/", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/nutritionLabel.png`,
      params: {
        showOptionalNutrients: "false",
        showZeroValues: "false",
        showIngredients: "true",
      },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
      responseType: "arraybuffer",
    };

    const recipe = (await axios.request(options)).data;
    res.send(Buffer.from(recipe, "binary").toString("base64"));
  } catch (ex) {
    next(ex);
  }
});


router.get("/detailsByRecipeId/:id", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`,
      params: { stepBreakdown: "true" },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    const recipe = (await axios.request(options)).data;
    res.send(recipe);
  } catch (ex) {
    next(ex);
  }
});