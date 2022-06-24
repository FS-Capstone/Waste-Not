import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  TextField,
  MenuItem,

} from "@mui/material";
import { fetchRecipes } from "../../store";

export default function SearchWithPantry({handleNumChange, handleRankChange, ranking, number, recipeSearch}){
  const dispatch = useDispatch();
  const pantry = useSelector((state) => state.selectedPantry);
  const numValues = [6, 12, 18, 24, 48, 96];

  const rankingValues = [
    { display: "Maximize Used Ingredients", value: 'max-used-ingredients' },
    { display: "Minimize Missing Ingredients", value: 'min-missing-ingredients' },
  ];
  


  
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