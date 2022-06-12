import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@mui/material";

const Recipe = () => {
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [tools, setTools] = useState([]);

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

    getRecipeInfo(id);
    getRecipeSteps(id);
    getEquipment(id);
  }, [id]);

  const { nutrients } = recipeInfo.nutrition ? recipeInfo.nutrition : [];

  const { equipment } = tools ? tools : [];

  return (
    <div>
      <Box>
        {!recipeInfo ? (
          <Typography>RECIPE STEPS: </Typography>
        ) : (
          <Typography> {recipeInfo.title} RECIPE STEPS:</Typography>
        )}
        <ul>
          {recipeSteps.length === 0
            ? "Recipe Loading..."
            : recipeSteps[0].steps.map((step) => {
                return (
                  <li key={step.number}>
                    <Typography>{step.step}</Typography>
                  </li>
                );
              })}
        </ul>
      </Box>
      <hr />
      <Box>
        <Typography>NUTRITION INFORMATION: </Typography>

        {!nutrients
          ? null
          : nutrients.map((nutrient, index) => {
              return (
                <div key={index}>
                  {nutrient.name} : {nutrient.amount} {nutrient.unit}
                </div>
              );
            })}
      </Box>
      <hr />
      <Box>
        <Typography>EQUIPMENT NEEDED: </Typography>
        {!equipment
          ? null
          : equipment.map((value, index) => {
              return <CardMedia key={index}>{value.name}</CardMedia>;
            })}
      </Box>
    </div>
  );
};

export default Recipe;
