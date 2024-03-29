/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";

import RecipeCard from "./RecipeCard";
import MissingIngredientChips from "./MissingIngredientChips";

const SearchResults = ({showLoadMore, loading, handleLoadMore, handleLoadMoreComplex}) => {
  const location = useLocation();
  const recipes = useSelector(state => {
    if(location.pathname === '/pantry'){
      return state.ingredientRecipes
    } else return state.complexRecipes
  })
  const pantry = useSelector((state) => state.selectedPantry);
  const pantryIngredientIds = pantry?.ingredients?.map(ingredient => ingredient.id)
  const ingredients = useSelector(state => state.ingredients)
 

  //get flattened array of all missing ingredients from recipes in state, then filter for duplicate values
  const missingIngredientsData = recipes
    .map((recipe) =>
      recipe.missedIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
      }))
    )
    .flat();
  const uniqueIngredients = new Set();
  const missingIngredients = missingIngredientsData.filter((ingredient) => {
    const isDuplicate = uniqueIngredients.has(ingredient.id);
    uniqueIngredients.add(ingredient.id);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });

  let missingIngredientsRenamed;

  const [missingIngredientList, setMissingIngredientList] = useState([]);

  useEffect(() => {
    missingIngredientsRenamed = missingIngredients
      .map((ingredient) => {
        const trueIngredient = ingredients.find(
          (trueIngredient) => trueIngredient.id === ingredient.id
        );
        if (trueIngredient) {
          return { id: ingredient.id, name: trueIngredient.name };
        }
        // add new ingredient to database, get nutrition info if possible
        return {};
      })
      .filter(
        (ingredient) => !pantryIngredientIds.includes(ingredient.id)
      );
    setMissingIngredientList(missingIngredientsRenamed);
  }, [recipes, pantry]);

  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <MissingIngredientChips missingIngredientList={missingIngredientList}/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        columnSpacing={2}
        sx={{ width: "90%", margin: "0 auto 2rem auto", textAlign: "center", padding:'1rem' }}
      >
        { location.pathname === '/pantry' ? recipes.map((recipe) => {
          return (
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid> )
        }) :
          recipes.map(recipe => {
            return (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid> )
          })
        }
      </Grid>
      {loading ? <Box sx={{display:'flex', justifyContent:'center', marginBottom:'1rem'}}><Typography variant='h5' sx={{marginRight:'1rem'}}>Loading...</Typography><CircularProgress color='primary'/> </Box>: null }
      {recipes.length && location.pathname === '/pantry' ? <Button variant='contained' onClick={(e)=>handleLoadMore(e)}>Load More Recipes</Button> : recipes.length ? <Button variant='contained' onClick={(e)=>handleLoadMoreComplex(e)}>Load More Recipes</Button> : null}
    </Box>
  );
};

export default SearchResults;
