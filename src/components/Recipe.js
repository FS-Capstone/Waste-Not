import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Stack, CardMedia, Card } from "@mui/material";

const Recipe = () => {
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [tools, setTools] = useState([]);
  const [nutritionLabel, setNutritionLabel] = useState("");

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

  const { nutrients } = recipeInfo.nutrition ? recipeInfo.nutrition : [];

  const { equipment } = tools ? tools : [];

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
          <img
            src={`data:image/jpeg;base64,${nutritionLabel}`}
            alt="NUTRITION LABEL"
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <Typography variant="h5">EQUIPMENT NEEDED: </Typography>
        {!equipment
          ? null
          : equipment.map((value, index) => {
              return (
                <div key={index}>
                  <img
                    src={`https://spoonacular.com/cdn/equipment_100x100/${value.image}`}
                    alt={value.name}
                  />
                  {value.name.toUpperCase()}
                </div>
              );
            })}
      </Box>
    </Stack>
  );
};

export default Recipe;
