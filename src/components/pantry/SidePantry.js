import React from "react";
import { useSelector } from "react-redux";
import { Box, List  } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import { ingredientList } from "../../../script/seedData";

export default function SidePantry() {
  const selectedPantryId = useSelector(state => state.auth.currentlySelectedPantryId);
  const pantry = useSelector(state => state.pantries.find(pantry => pantry.id === selectedPantryId));
  const ingredientsInPantry = pantry?.ingredients;

  if(!ingredientsInPantry)
    return null;

  return(
    <Box>
      <PantryAutocomplete searchOptions={ingredientList} searchName='pantrySearch' selectedPantry={pantry} />

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