import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { PantryItem } from "./PantryItem";
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import { ingredientList } from "../../../script/seedData";
import Collapse from '@mui/material/Collapse';


const getAllCategories = (ingredients) => {
  const mapCategoriesToIngredients = {};

  ingredients.forEach(ingredient => {
    const broadCategory = ingredient.broadCategory;
    if(mapCategoriesToIngredients[broadCategory]){
      mapCategoriesToIngredients[broadCategory].push(ingredient);
    }
    else{
      mapCategoriesToIngredients[broadCategory] = [ingredient];
    }
  })
  return mapCategoriesToIngredients;
}

export default function SidePantry() {
  const pantry = useSelector(state => state.selectedPantry);
  const ingredientsInPantry = pantry?.ingredients;
  const [openedCategories, setOpenedCategories] = useState({});


  useEffect(() => {
    if(!ingredientsInPantry)
      return null;
    const categoriesWithIngredients = getAllCategories(ingredientsInPantry);
    const categories = Object.keys(categoriesWithIngredients);
    for(let category of categories){
      setOpenedCategories({...openedCategories, [category]:false});
    }
  }, [])


  if(!ingredientsInPantry)
    return null;





  console.log(openedCategories);
  return(
    <Box>
      <PantryAutocomplete searchOptions={ingredientList} searchName='pantrySearch' selectedPantry={pantry} />

      <Divider/>

      {Object.keys(categoriesWithIngredients).map(category => {
        return (
          <ListItemButton key={category}>
            {category}
          </ListItemButton>
          // <Collapse>
            // <List>
            //   <div>{category}</div>
            // </List>
          // </Collapse>

          // <Collapse key={category}>
          //   <List>

          //   </List>
          // </Collapse>
        )
      })}

      {/* <List>
        {
          ingredientsInPantry.map(ingredient => {
            return <PantryItem ingredient={ingredient} key={ingredient.id}/>
          })
        }
      </List> */}
    </Box>


  )
}