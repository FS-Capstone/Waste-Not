import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, List, Button  } from "@mui/material";
import { PantryItem } from "./PantryItem";
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import { ingredientList } from "../../../script/seedData";

import axios from 'axios';

export default function SidePantry() {
  const pantry = useSelector(state => state.selectedPantry);
  const ingredientsInPantry = pantry?.ingredients;

  useEffect(()=>{
    console.log('side pantry rendered')
  }, [pantry])

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