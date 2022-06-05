import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";
import { Box, List  } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

export default function SidePantry() {
  const recipeNames = useSelector((state) => state.ingredients.map(ingredient => ingredient.name))

  const ingredientsInPantry = useSelector(state => {
    //find the user's currently selected pantry and return the ingredients in it
    const selectedPantryId = state.auth.currentlySelectedPantryId;
    const selectedPantry = state.pantries.find(pantry => pantry.id === selectedPantryId)
    return selectedPantry?.ingredients;
  })
  
  if(!ingredientsInPantry)
    return null;

  return(
    <Box>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={recipeNames}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Add to Pantry" />}
      />

      
      <Divider/>

      <List>
        {
          ingredientsInPantry.map(ingredient => {
            return <ListItem key={ingredient.id}>{ingredient.name}</ListItem>
          })
        }
      </List>

    </Box>


  )
}