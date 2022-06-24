import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Button, List, ListItemButton } from "@mui/material";
import { PantryItem } from "./PantryItem";
import Divider from '@mui/material/Divider';
import PantryAutocomplete from "../PantryAutocomplete";
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import SearchResults from '../RecipeResults/SearchResults'
import { useTheme } from "@mui/system";

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
  const theme = useTheme()
  const pantry = useSelector(state => state.selectedPantry);
  let localStorageIngredients = JSON.parse(window.localStorage.getItem('selectedIngredients')) || [];
  localStorageIngredients = localStorageIngredients.reduce((accum, ing) => {return {...accum, [ing]: true}}, {})

  const [selectedIngredients, setSelectedIngredients] = useState(localStorageIngredients);
  const numSelectedIngredients = Object.values(selectedIngredients).filter(ingredient => ingredient).length
  const ingredientList = useSelector(state => state.ingredients);

  const ingredientsInPantry = pantry?.ingredients;
  const [checkedCategories, setCheckedCategories] = useState({});

  const [openedCategories, setOpenedCategories] = useState({});


  useEffect(() => {
    const ingredients = Object.keys(selectedIngredients).filter(id => selectedIngredients[id])
    window.localStorage.setItem('selectedIngredients', JSON.stringify(ingredients));
  }, [numSelectedIngredients])


  if(!ingredientsInPantry)
    return null;
  const categoriesWithIngredients = getAllCategories(ingredientsInPantry);
  const categories = Object.keys(categoriesWithIngredients).sort((a,b) => a.localeCompare(b));



  //opens or closes the category
  const toggleCategory = (category) => {
    if(openedCategories[category]){
      setOpenedCategories({...openedCategories, [category]: !openedCategories[category]})
    }
    else{
      setOpenedCategories({...openedCategories, [category]: true})
    }
  }

  //handles click on ingredient-level checkbox
  const handleCheck = (ingredient, category) => {
    const name = String(ingredient.name)

    if(name in selectedIngredients){
      setSelectedIngredients({...selectedIngredients, [name]: !selectedIngredients[name]});
    }
    else{
      setSelectedIngredients({...selectedIngredients, [name]: true});
    }
  }

  //handles click on category-level checkbox
  const selectCategory = (evt, category) =>{
    evt.stopPropagation();
    const categorySelected = evt.target.checked;
    setCheckedCategories({...checkedCategories, [category]: !checkedCategories[category]});
    for(let ingredient of categoriesWithIngredients[category]){
      setSelectedIngredients((prevState) => ({...prevState, [ingredient.name]: categorySelected ?  true : false}))
    }
  }

  //if sent true, selects all. If sent false, deselects all
  const selectAll = (select) => {
    const selectedCategories = {};
    const allIngredientsSelected = {};

    ingredientsInPantry.forEach((ingredient) => {
      allIngredientsSelected[ingredient.name] = select;
    })

    for(let i = 0; i < categories.length; i++){
      selectedCategories[categories[i]] = select;
    }
    setCheckedCategories(selectedCategories);  

    setSelectedIngredients(allIngredientsSelected);
    
  }

  const isCategorySelected = (category) =>{
    const ingredientsInCategory = categoriesWithIngredients[category];
    for(let i = 0; i < ingredientsInCategory.length; i++){
      if(!selectedIngredients[ingredientsInCategory[i].name])
        return false;
    }
    return true;
  }

  const numSelectedInCategory = (category) => {
    const ingredientsInCategory = categoriesWithIngredients[category];
    const numSelected = ingredientsInCategory.filter(ingredient => selectedIngredients[ingredient.name]).length;
    return numSelected;
  }


  return(
    <Box sx={{display:'flex', flexDirection:'column'}}>
      <PantryAutocomplete searchOptions={ingredientList} searchName='pantrySearch' selectedPantry={pantry} />
      <Button onClick={() => selectAll(true)}>Select All</Button>
      <Button onClick={() => selectAll(false)}>Deselect All</Button>
      <Divider/>
      
      {categories.map(category => {
        return (
          <List key={category}>
            {/*buttons for all categories */}
            <ListItemButton onClick={(evt) => toggleCategory(category)} sx={{display:'flex', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <Checkbox 
                  onClick={evt => selectCategory(evt, category)} 
                  checked={isCategorySelected(category)}
                  />
                <Typography variant="h6">{category}{`(${categoriesWithIngredients[category].length})`}</Typography>
              </div>
              {numSelectedInCategory(category) > 0 ? 
                <Typography variant="caption" color={theme.palette.text.disabled}> {`${numSelectedInCategory(category)} selected`} </Typography>
              :
                null
              }
            </ListItemButton>
            <Collapse in={openedCategories[category]} timeout='auto' unmountOnExit>
              {/* Filter out categories matching current category, then display them */}
              <List>
                {ingredientsInPantry.filter(ingredient => ingredient.broadCategory === category).map(ingredient => {
                    return <PantryItem 
                            ingredient={ingredient} 
                            key={ingredient.id}
                            checked={!!selectedIngredients[ingredient.name]}
                            handleCheck={handleCheck}
                            category={category}
                            />
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
