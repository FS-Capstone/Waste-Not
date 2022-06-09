import React from "react";
import { useSelector } from "react-redux";
import { Box, List  } from "@mui/material";
import { PantryItem } from "./PantryItem";
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import { ingredientList } from "../../../script/seedData";

export default function SidePantry() {
  const pantry = useSelector(state => state.selectedPantry);
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
            return <PantryItem ingredient={ingredient} key={ingredient.id}/>
          })
        }
      </List>

    </Box>


  )
}