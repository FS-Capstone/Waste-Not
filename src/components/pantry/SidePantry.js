import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, List, ListItemButton } from "@mui/material";
import { PantryItem } from "./PantryItem";
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import { ingredientList } from "../../../script/seedData";
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

//returns an object with all categories as keys, and a list of all ingredients in that category as the value
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
  if(!ingredientsInPantry)
    return null;
  const categoriesWithIngredients = getAllCategories(ingredientsInPantry);
  const categories = Object.keys(categoriesWithIngredients).sort((a,b) => a.localeCompare(b));


  const toggleCategory = (category) => {
    if(openedCategories[category]){
      setOpenedCategories({...openedCategories, [category]: !openedCategories[category]})
    }
    else{
      setOpenedCategories({...openedCategories, [category]: true})
    }
  }

  return(
    <Box>
      <PantryAutocomplete searchOptions={ingredientList} searchName='pantrySearch' selectedPantry={pantry} />
      <Divider/>

      {categories.map(category => {
        return (
          <List key={category}>
            {/*buttons for all categories */}
            <ListItemButton onClick={(evt) => toggleCategory(category)}>
              <Checkbox onClick={evt => evt.stopPropagation()}/>
              <Typography variant="h6">{category}{`(${categoriesWithIngredients[category].length})`}</Typography>
            </ListItemButton>
            <Collapse in={openedCategories[category]} timeout='auto' unmountOnExit>
              {/* Filter out categories matching current category, then display them */}
              <List>
                {ingredientsInPantry.filter(ingredient => ingredient.broadCategory === category).map(ingredient => {
                    return <PantryItem ingredient={ingredient} key={ingredient.id}/>
                  })
                }
              </List>
            </Collapse>
          </List>
        )
      })}


    </Box>


  )
}