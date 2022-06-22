/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
} from "@mui/material";

import RecipeCard from "./RecipeCard";
import MissingIngredientChips from "./MissingIngredientChips";

const SearchResults = () => {
  const recipes = useSelector((state) => state.recipes);
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
    <div>
      <MissingIngredientChips missingIngredientList={missingIngredientList}/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        columnSpacing={2}
        sx={{ width: "80%", margin: "0 auto", textAlign: "center" }}
      >
        {recipes.map((recipe) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ margin: "2rem" }}></Box>
    </div>
  );
};

export default SearchResults;
