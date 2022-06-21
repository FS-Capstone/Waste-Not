const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
module.exports = router;

router.get("/byIngredients", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      params: {
        ingredients: req.query.ingredients,
        number: req.query.number,
        ignorePantry: req.query.ignorePantry,
        ranking: req.query.ranking,
      },
      headers: {
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.API_KEY,
      },
    };
    const recipes = (await axios.request(options)).data;
    res.send(recipes);
  } catch (ex) {
    next(ex);
  }
});

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