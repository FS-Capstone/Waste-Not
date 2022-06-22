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

export default function SearchWithPantry(){
  const dispatch = useDispatch();
  const pantry = useSelector((state) => state.selectedPantry);
  const numValues = [6, 12, 18, 24, 48, 96];
  const [number, setNumber] = useState(12);
  const [ranking, setRanking] = useState(1);
  const rankingValues = [
    { display: "Maximize Used Ingredients", value: 1 },
    { display: "Minimize Missing Ingredients", value: 2 },
  ];
  const handleRankChange = (e) => {
    setRanking(e.target.value);
  };


  const recipeSearch = async (e) => {
    e.preventDefault();
    const selectedIngredients = window.localStorage.getItem(
      "selectedIngredients"
    )
      ? JSON.parse(window.localStorage.getItem("selectedIngredients"))
      : [];
    if (selectedIngredients.length) {
      dispatch(fetchRecipes(selectedIngredients, number, ranking));
    } else {
      const ingredients = pantry?.ingredients;
      dispatch(fetchRecipes(ingredients, number, ranking));
    }
  };
  const handleNumChange = (e) => {
    setNumber(e.target.value);
  };

  
  return(
    <Box
          id='ingredientSearchBox'
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          <Button
            variant="outlined"
            sx={{ paddingLeft: "4.2rem", paddingRight: "4.12rem" }}
            onClick={(e) => recipeSearch(e)}
          >
            Search for recipes!
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              id="resultsNumber"
              select
              value={number}
              onChange={handleNumChange}
            >
              {numValues.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              id="ranking"
              select
              value={ranking}
              onChange={handleRankChange}
            >
              {rankingValues.map((ranking) => (
                <MenuItem key={ranking.value} value={ranking.value}>
                  {ranking.display}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
  )
}