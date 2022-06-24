import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { saveRecipe, removeSavedRecipe } from "../store/complexRecipes";
import Modal from "./Modal";
import {
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useTheme } from "@emotion/react";

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
  const [isOpen, setIsOpen] = useState(false);
  const savedRecipes = useSelector((state) =>
    state.auth.recipes?.map((recipe) => recipe.recipeId)
  );
  const loggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  const { id } = useParams();

  const theme = useTheme();

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
          food: cuisines[0] ? cuisines[0] : "Italian",
          maxPrice: "50",
        },
      })
    ).data;
    setWines(wines);
    setIsOpen(true);
  };
  const { extendedIngredients } = recipeInfo ? recipeInfo : [];
  const { equipment } = tools ? tools : [];
  const { cuisines } = recipeInfo ? recipeInfo : [];

  if (!savedRecipes) return null;

  return (
    <Box
      sx={{
        border: "1px solid",
        display: "flex",
        backgroundImage: 'url("/images/Background14.jpg")',
        backgroundSize: "cover",
        justifyContent: "center",
        width: "100vw",
      }}
      direcition="row"
    >
      <Paper
        sx={{
          opacity: ".95",
          display: "flex",
          width: "60vw",
          minHeight: "100vh",
          backgroundColor: `${theme.palette.background.paper}`,
        }}
      >
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              margin: "80px",
            }}
          >
            {!recipeInfo ? (
              <Typography align="justify" variant="h6">
                RECIPE STEPS:{" "}
              </Typography>
            ) : (
              <div>
                <Typography align="center" variant="h3">
                  {" "}
                  {recipeInfo.title}{" "}
                </Typography>
                <hr />
                <Typography variant="h5" contained sx={{ margin: "20px" }}>
                  RECIPE STEPS:
                </Typography>
              </div>
            )}
            <ul>
              {recipeSteps.length === 0
                ? "Recipe Loading..."
                : recipeSteps[0].steps.map((step) => {
                    return (
                      <li key={step.number} style={{ maxWidth: "70%" }}>
                        <Typography variant="body1">{step.step}</Typography>
                      </li>
                    );
                  })}
            </ul>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "20px",
            }}
          >
            {!nutritionLabel ? (
              <Typography variant="h5">NUTRITION INFORMATION: </Typography>
            ) : (
              <img
                src={`data:image/jpeg;base64,${nutritionLabel}`}
                alt="NUTRITION LABEL"
                style={{ width: "20em", height: "50em" }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "1rem",
              overflowWrap: "break-word",
            }}
          >
            {!extendedIngredients ? (
              <Typography variant="h5">INGREDIENTS Loading: </Typography>
            ) : (
              <ImageList
                sx={{ width: 800, height: 450 }}
                cols={5}
                gap={10}
                rowHeight={180}
              >
                {extendedIngredients.map((ingredient, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                        alt={ingredient.name}
                      />{" "}
                      <ImageListItemBar
                        position="below"
                        title={ingredient.name}
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            )}
          </Box>

          <Typography variant="h5" sx={{ align: "center" }}>
            EQUIPMENT NEEDED:{" "}
          </Typography>
          <ImageList
            sx={{ width: 700, height: 350 }}
            cols={4}
            gap={15}
            rowHeight={150}
          >
            {!equipment
              ? null
              : equipment.map((value, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img
                        src={`https://spoonacular.com/cdn/equipment_100x100/${value.image}`}
                        alt={value.name}
                      />
                      <ImageListItemBar position="below" title={value.name} />
                    </ImageListItem>
                  );
                })}
          </ImageList>

          <Box sx={{ display: "flex", align: "center" }}>
            <button
              style={{ borderRadius: "30%", padding: "10px", margin: "25px" }}
              onClick={handleOnClick}
            >
              Search Wine Pairings
            </button>
            {wines.pairedWines ? (
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {wines.pairedWines}
              </Modal>
            ) : null}

            {
              //Save recipe logic
              loggedIn ? (
                savedRecipes.includes(id * 1) ? (
                  <button
                    style={{
                      borderRadius: "30%",
                      padding: "10px",
                      margin: "25px",
                    }}
                    onClick={() => dispatch(removeSavedRecipe(id))}
                  >
                    Unsave Recipe
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "30%",
                      padding: "10px",
                      margin: "25px",
                    }}
                    onClick={() => dispatch(saveRecipe(id))}
                  >
                    Save Recipe
                  </button>
                )
              ) : null
            }
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Recipe;
