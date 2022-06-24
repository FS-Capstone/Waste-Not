import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { saveRecipe, removeSavedRecipe } from "../store/recipes";

import {
  Box,
  Typography,
  Stack,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";

const Recipe = () => {
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [tools, setTools] = useState([]);
  const [wines, setWines] = useState([]);
  const [nutritionLabel, setNutritionLabel] = useState("");
  const savedRecipes = useSelector((state) =>
    state.auth.recipes?.map((recipe) => recipe.recipeId)
  );
  const loggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    async function getRecipeSteps(recipeId) {
      try {
        const response = await axios.get(`/api/search/byRecipeId/${recipeId}`);
        setRecipeSteps(response.data);
      } catch (err) {
        console.log("There was an error retrieving the recipe steps --->", err);
      }
    }

    async function getRecipeInfo(recipeId) {
      try {
        const recipe = await axios.get(`/api/search/nutritionById/${recipeId}`);
        setRecipeInfo(recipe.data);
      } catch (err) {
        console.log(
          "There was an error retrieving the recipe information --->",
          err
        );
      }
    }
    async function getEquipment(recipeId) {
      try {
        const response = await axios.get(
          `/api/search/equipmentById/${recipeId}`
        );
        setTools(response.data);
      } catch (err) {
        console.log(
          "There was an error retrieving the recipe information --->",
          err
        );
      }
    }
    async function getRecipeLabelInfo(recipeId) {
      try {
        const recipe = await axios.get(
          `/api/search/nutritionLabelById/${recipeId}`
        );
        setNutritionLabel(recipe.data);
      } catch (err) {
        console.log(
          "There was an error retrieving the recipe information --->",
          err
        );
      }
    }

    getRecipeInfo(id);
    getRecipeSteps(id);
    getEquipment(id);
    getRecipeLabelInfo(id);
  }, [id]);

  const handleOnClick = async (req, res, next) => {
    const wines = (
      await axios.get("/api/wine/winePairing", {
        params: {
          food: cuisines[0],
          maxPrice: "50",
        },
      })
    ).data;
    setWines(wines);
  };

  const { nutrients } = recipeInfo.nutrition ? recipeInfo.nutrition : [];
  const { equipment } = tools ? tools : [];
  const { cuisines } = recipeInfo ? recipeInfo : [];

  if (!savedRecipes) return null;

  return (
    <Stack sx={{ border: "1px solid" }} direcition="row" spacing={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        {!recipeInfo ? (
          <Typography variant="h5">RECIPE STEPS: </Typography>
        ) : (
          <Typography variant="h5">
            {" "}
            {recipeInfo.title} RECIPE STEPS:
          </Typography>
        )}
        <ul>
          {recipeSteps.length === 0
            ? "Recipe Loading..."
            : recipeSteps[0].steps.map((step) => {
                return (
                  <li key={step.number}>
                    <Typography variant="body1">{step.step}</Typography>
                  </li>
                );
              })}
        </ul>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          {!nutritionLabel ? (
            <Typography variant="h5">NUTRITION INFORMATION: </Typography>
          ) : (
            <Card
              sx={{
                display: "flex",
                alignItems: "stretch",
                minHeight: "20vh",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "50%" }}
                image={`data:image/jpeg;base64,${nutritionLabel}`}
                alt="NUTRITION LABEL"
              />
              <Box>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "stretch",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6">EQUIPMENT NEEDED: </Typography>
                  {!equipment
                    ? null
                    : equipment.map((value, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <img
                              src={`https://spoonacular.com/cdn/equipment_100x100/${value.image}`}
                              alt={value.name}
                            />
                            {value.name.toUpperCase()}
                          </Box>
                        );
                      })}
                </CardContent>
              </Box>
            </Card>
          )}
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "stretch",
            height: "100%",
          }}
        >
          <button onClick={handleOnClick}>Search Wine Pairings</button>
          {wines.pairedWines
            ? wines.pairedWines.map((wine, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1rem",
                    }}
                  >
                    <Typography>{wine.toUpperCase()}</Typography>
                  </Box>
                );
              })
            : null}
        </CardContent>
      </Box>

      {
        //Save recipe logic
        loggedIn ? (
          savedRecipes.includes(id * 1) ? (
            <button onClick={() => dispatch(removeSavedRecipe(id))}>
              Unsave Recipe
            </button>
          ) : (
            <button onClick={() => dispatch(saveRecipe(id))}>
              Save Recipe
            </button>
          )
        ) : null
      }
    </Stack>
  );
};

export default Recipe;
