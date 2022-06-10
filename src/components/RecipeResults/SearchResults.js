import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Chip, Button, Divider, Card} from '@mui/material';
import { addMultiplePantryItems, fetchRecipes } from '../../store';
import {ingredientList} from '../../../script/seedData';

const SearchResults = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(state=>state.recipes)
  const pantry = useSelector(state => state.selectedPantry)

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

  const missingIngredientsRenamed = missingIngredients.map(ingredient => {
    const trueIngredient = ingredientList.find(trueIngredient => trueIngredient.id === ingredient.id);
    if(trueIngredient){
      return {id: ingredient.id, name: trueIngredient.ingredient}
    }
    return {}
  })

  const [missingIngredientList, setMissingIngredientList] = useState([])

  const [selectedMissingIngredients, setSelectedMissingIngredients] = useState([])

  useEffect(()=>{
    setMissingIngredientList(missingIngredientsRenamed)
    console.log('recipes rendered')
    console.log(missingIngredientsRenamed)
  }, [recipes, pantry])

  const handleClick = (e, ingredientId) => {
    e.preventDefault();
    selectedMissingIngredients.includes(ingredientId) ? setSelectedMissingIngredients(selectedMissingIngredients.filter(ingredient => ingredient !== ingredientId)) : setSelectedMissingIngredients([...selectedMissingIngredients, ingredientId])
    console.log(missingIngredientsRenamed)
  }

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(addMultiplePantryItems(selectedMissingIngredients, pantry.id))
    setMissingIngredientList(missingIngredientList.filter(ingredient => !selectedMissingIngredients.includes(ingredient)))
    setSelectedMissingIngredients([])
  }

  const recipeSearch = async(e) => {
    const selectedIngredients = window.localStorage.getItem('selectedIngredients') ? window.localStorage.getItem('selectedIngredients') : [];
    if(selectedIngredients.length){
      dispatch(fetchRecipes(selectedIngredients))
    }
    else {
      const ingredients = pantry?.ingredients
      dispatch(fetchRecipes(ingredients))
    }
  }


  return(
    <div>
      <Box>
        {!missingIngredientList.length ? 'testing' : missingIngredientList.map(ingredient => (
          ingredient.id ? <Chip key={ingredient.id} variant={selectedMissingIngredients.includes(ingredient.id) ? 'filled' : 'outlined'} clickable label={ingredient.name} onClick={(e)=>handleClick(e, ingredient.id)} sx={{margin:'3px'}}/> : null
        ))}
        
      </Box>
      {!selectedMissingIngredients.length ? null : <Button variant='contained' onClick={(e)=> handleSave(e)}>Add Selected Ingredients to Pantry</Button>}
      <Divider/>
      {recipes.map(recipe=>{
        return <Card key={recipe.id}>{recipe.title} {recipe.image} {recipe.missedIngredientCount} {recipe.usedIngredientCount} {recipe.unusedIngredientCount}</Card>
      })}
      <Divider/>
      <Button variant='outlined' onClick={(e)=>recipeSearch(e)}>Search for recipes!</Button> 
    </div>
  )
};

export default SearchResults