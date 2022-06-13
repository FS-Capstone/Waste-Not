import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveIngredients } from "../../store";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredients = {
    missingIngredients: recipe.missedIngredients,
    usedIngredients: recipe.usedIngredients,
    unusedIngredients: recipe.unusedIngredients,
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(saveIngredients(ingredients));
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card>
      <CardActionArea
        onClick={(e) => {
          handleClick(e);
        }}
        sx={{
          display: "flex",
          alignItems: "stretch",
          minHeight: "20vh",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "33%" }}
          image={recipe.image}
          alt={recipe.title}
        />
        <Box sx={{ width: "100%", height: "100%" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="div" variant="h5">
              {recipe.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {!recipe.missedIngredientCount
                ? "You have all the necessary ingredients!"
                : recipe.missedIngredientCount === 1
                ? "Missing 1 ingredient"
                : `Missing ${recipe.missedIngredientCount} ingredients`}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {recipe.usedIngredientCount} pantry{" "}
              {recipe.usedIngredientCount === 1 ? "ingredient" : "ingredients"}{" "}
              used
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {recipe.unusedIngredientCount &&
              recipe.unusedIngredientCount === 1
                ? `${recipe.unusedIngredientCount} unused pantry ingredient`
                : recipe.unusedIngredientCount > 1
                ? `${recipe.unusedIngredientCount} unused pantry ingredients`
                : "No unused pantry ingredients"}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
