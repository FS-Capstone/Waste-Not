import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CircularProgress
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
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
  const totalIngredients = recipe.missedIngredientCount + recipe.usedIngredientCount
  const ingredientPercentage = (recipe.usedIngredientCount/totalIngredients)*100

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(saveIngredients(ingredients));
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card sx={{display: "flex", alignItems: "stretch", minHeight: "20vh", height: "100%"}}>
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
        <Box id='card-content-box' >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent:'stretch',
              height:'100%'
            }}
            id='card-content'
          >
            <Typography component="div" variant="h5" sx={{height:'auto'}}>
              {recipe.title}
            </Typography>
            {
              !recipe.missedIngredientCount ? 
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly', height:'100%'}}>
                <Typography variant='subtitle1'>You have all the necessary ingredients!</Typography>
                <CheckCircleOutline sx={{color:'#2e7d32', fontSize:'3rem'}}/>
              </Box>
            :
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly', height:'100%'}}>
                <Typography variant='subtitle1' color='#ed6c02'>Missing {recipe.missedIngredientCount} {recipe.missedIngredientCount === 1 ? 'ingredient' : 'ingredients'}</Typography>
                <CircularProgress thickness='5' sx={{margin:'1rem'}} variant='determinate' color={ingredientPercentage < 33 ? 'error' : ingredientPercentage < 66 ? 'warning' : 'success'} value={ingredientPercentage} />
                <Typography variant='subtitle1' color='#2e7d32'>Using {recipe.usedIngredientCount} pantry {recipe.usedIngredientCount === 1 ? 'ingredient' : 'ingredients'}</Typography>
              </Box>
            }
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
