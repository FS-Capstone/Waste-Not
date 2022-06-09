import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, List, Button  } from "@mui/material";
import { PantryItem } from "./PantryItem";
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import { ingredientList } from "../../../script/seedData";
import { fetchRecipes } from "../../store";

import axios from 'axios';

export default function SidePantry() {
  const pantry = useSelector(state => state.selectedPantry);
  const dispatch = useDispatch();
  const ingredientsInPantry = pantry?.ingredients;

  const handleClick = async(e) => {
    e.preventDefault();
    // const ingredientString = ingredientsInPantry.map(ingredient => ingredient.name).join(',');
    // const recipes = (await axios.get('/api/search/byIngredients', {
    //   params:{
    //     ingredients: ingredientString,
    //     number: '12',
    //     ignorePantry: true,
    //     ranking: '1'
    //   }
    // })).data
    // dispatch(addRecipes(ingredientsInPantry))
    console.log('clicked the button')
  }

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
      <Divider/>
      <Button onClick={(e)=>handleClick(e)}>Find Recipes</Button>

    </Box>


  )
}