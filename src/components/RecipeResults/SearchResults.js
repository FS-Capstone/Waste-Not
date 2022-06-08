import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Chip, Button, Divider, Card} from '@mui/material';
import { addPantryItem, addRecipes } from '../../store';

const SearchResults = () => {
  const dispatch = useDispatch();
  const selectedPantryId = useSelector(state => state.auth.currentlySelectedPantryId);
  const recipes = useSelector(state=>state.recipes)
  const pantry = useSelector(state => state.pantries.find(pantry => pantry.id === selectedPantryId));
  const ingredientsInPantry = pantry?.ingredients;

  //get flattened array of all missing ingredients from recipes in state, then filter for duplicate values
  const missingIngredientsData = (recipes.map(recipe => recipe.missedIngredients.map(ingredient => ({id:ingredient.id, name:ingredient.name})))).flat();
  const uniqueIngredients = new Set()
  const missingIngredients = missingIngredientsData.filter(ingredient => {
      const isDuplicate = uniqueIngredients.has(ingredient.id);
      uniqueIngredients.add(ingredient.id);
      if(!isDuplicate){
          return true
      }
      return false
  })

  const [selectedIngredients, setSelectedIngredients] = useState([])

  const handleClick = (e, ingredientId) => {
    e.preventDefault();
    selectedIngredients.includes(ingredientId) ? setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== ingredientId)) : setSelectedIngredients([...selectedIngredients, ingredientId])
  }

  const handleSave = e => {
    e.preventDefault();
    selectedIngredients.forEach(ingredient => dispatch(addPantryItem(ingredient, selectedPantryId)))
    dispatch(addRecipes(ingredientsInPantry))
  }


  return(
    <div>
      <Box>
        {missingIngredients.map(ingredient => (
          <Chip key={ingredient.id} variant={selectedIngredients.includes(ingredient.id) ? 'filled' : 'outlined'} clickable label={ingredient.name} onClick={(e)=>handleClick(e, ingredient.id)} sx={{margin:'3px'}}/>
        ))}
        
      </Box>
      {!selectedIngredients.length ? null : <Button variant='contained' onClick={(e)=> handleSave(e)}>Add Selected Ingredients to Pantry</Button>}
      <Divider/>
      {recipes.map(recipe=>{
        return <Card key={recipe.id}>{recipe.title} {recipe.image} {recipe.missedIngredientCount} {recipe.usedIngredientCount} {recipe.unusedIngredientCount}</Card>
      })}
    </div>
  )
};

export default SearchResults