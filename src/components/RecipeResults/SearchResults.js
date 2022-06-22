/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Chip,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Autocomplete
} from "@mui/material";
import { addMultiplePantryItems, fetchRecipes, addMultipleShoppingItems, fetchComplexRecipes } from "../../store";
import RecipeCard from "./RecipeCard";
import SearchWithPantry from "./SearchWithPantry";
import AdvancedSearch from "./AdvancedSearch";

const SearchResults = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const pantry = useSelector((state) => state.selectedPantry);
  const pantryIngredientIds = pantry?.ingredients?.map(ingredient => ingredient.id)
  const user = useSelector(state=> state.auth)
  const shoppingList = useSelector(state => state.shoppingList);
  const listIds = shoppingList.map(ingredient => ingredient.id);
  const ingredients = useSelector(state => state.ingredients)
  const [value, setValue] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [offset, setOffset] = useState(0);



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

  const [selectedMissingIngredients, setSelectedMissingIngredients] = useState([]);

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

  const handleClick = (e, ingredient) => {
    e.preventDefault();
    selectedMissingIngredients.includes(ingredient)
      ? setSelectedMissingIngredients(
          selectedMissingIngredients.filter(
            (_ingredient) => _ingredient.id !== ingredient.id
          )
        )
      : setSelectedMissingIngredients([
          ...selectedMissingIngredients,
          ingredient,
        ]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const ingredientIds = selectedMissingIngredients.map(ingredient => ingredient.id)
    dispatch(addMultiplePantryItems(ingredientIds, pantry.id));
    setSelectedMissingIngredients([])
  };

  const addToList = e => {
    e.preventDefault();
    const dupesRemoved = selectedMissingIngredients.filter(ingredient => !listIds.includes(ingredient.id))
    dispatch(addMultipleShoppingItems(dupesRemoved, user.id))
    setSelectedMissingIngredients([])
  }






  return (
    <div>
      <Box id='searchContainer' sx={{display:'flex', justifyContent:'center'}}>
        <AdvancedSearch/>
        <SearchWithPantry/>
      </Box>
      <Box
        sx={{
          margin: "1rem auto 1rem auto",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifySelf: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {!missingIngredientList.length ? null : (
            <Typography variant="h6">
              Already have some of these ingredients?
            </Typography>
          )}
        </Box>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {!missingIngredientList.length
            ? null
            : !showAll ? missingIngredientList.slice(0,15).map((ingredient) =>
                ingredient.id ? (
                  <Chip
                    key={ingredient.id}
                    variant={
                      selectedMissingIngredients.includes(ingredient)
                        ? "filled"
                        : "outlined"
                    }
                    clickable
                    label={ingredient.name}
                    onClick={(e) => handleClick(e, ingredient)}
                    sx={{ margin: "3px" }}
                  />
                ) : null
              ) : missingIngredientList.map((ingredient) =>
              ingredient.id ? (
                <Chip
                  key={ingredient.id}
                  variant={
                    selectedMissingIngredients.includes(ingredient)
                      ? "filled"
                      : "outlined"
                  }
                  clickable
                  label={ingredient.name}
                  onClick={(e) => handleClick(e, ingredient)}
                  sx={{ margin: "3px" }}
                />
              ) : null
            )}
            {!showAll && missingIngredientList.length ? 
            <Chip variant='outlined' clickable label={`+ ${missingIngredientList.length - 15} more...`} onClick={() => setShowAll(true)} sx={{margin:'3px'}} />
            : null }
            {showAll && missingIngredientList.length ? <Chip variant='outlined' clickable label='Hide extra ingredients' onClick={() => setShowAll(false)} sx={{margin:'3px'}} /> : null}
          {!selectedMissingIngredients.length ? null : (
            <div>
              <Button sx={{marginRight:'2rem'}} variant="contained" onClick={(e) => handleSave(e)}>
                Add Selected Ingredients to Pantry
              </Button>
              <Button variant='outlined' onClick={(e) => addToList(e)}>
                Add Selected Ingredients to Shopping List
              </Button>
            </div>

          )}
        </Box>
      </Box>
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
