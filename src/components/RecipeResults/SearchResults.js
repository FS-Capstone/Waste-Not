import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Chip, Button, Grid, Typography, Paper} from '@mui/material';
import { addMultiplePantryItems, fetchRecipes } from '../../store';
import {ingredientList} from '../../../script/seedData';
import RecipeCard from './RecipeCard';

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

  let missingIngredientsRenamed;

  const [missingIngredientList, setMissingIngredientList] = useState([])

  const [selectedMissingIngredients, setSelectedMissingIngredients] = useState([])

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    missingIngredientsRenamed = missingIngredients.map(ingredient => {
      const trueIngredient = ingredientList.find(trueIngredient => trueIngredient.id === ingredient.id);
      if(trueIngredient){
        return {id: ingredient.id, name: trueIngredient.ingredient}
      }
      return {}
    }).filter(ingredient=> !selectedMissingIngredients.includes(ingredient.id))
    setSelectedMissingIngredients([])
    setMissingIngredientList(missingIngredientsRenamed)
    console.log('recipe useEffect', recipes)
  }, [recipes, pantry])

  const handleClick = (e, ingredientId) => {
    e.preventDefault();
    selectedMissingIngredients.includes(ingredientId) ? setSelectedMissingIngredients(selectedMissingIngredients.filter(ingredient => ingredient !== ingredientId)) : setSelectedMissingIngredients([...selectedMissingIngredients, ingredientId])
  }

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(addMultiplePantryItems(selectedMissingIngredients, pantry.id))
    console.log(recipes)
  }

  const recipeSearch = async(e) => {
    e.preventDefault();
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
      <Box sx={{margin:'1rem auto 1rem auto', width:'90%', display:'flex', flexDirection:'column', alignItems:'center', justifySelf:'center'}}>
        <Box sx={{display:'flex', justifyContent:'center', marginBottom:'1rem'}}>
          {!missingIngredientList.length ? null : <Typography variant='h6'>Already have some of these ingredients?</Typography>}
        </Box>
        <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
          {!missingIngredientList.length ? null : missingIngredientList.map(ingredient => (
            ingredient.id ? <Chip key={ingredient.id} variant={selectedMissingIngredients.includes(ingredient.id) ? 'filled' : 'outlined'} clickable label={ingredient.name} onClick={(e)=>handleClick(e, ingredient.id)} sx={{margin:'3px'}}/> : null
          ))}
          {!selectedMissingIngredients.length ? null : <Button variant='contained' onClick={(e)=> handleSave(e)}>Add Selected Ingredients to Pantry</Button>}
        </Box>
      </Box>
      <Box sx={{display: 'flex', justifyContent:'center', margin:'1rem'}}>
        <Button variant='outlined' onClick={(e)=>recipeSearch(e)}>Search for recipes!</Button> 
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        columnSpacing={2}
        sx={{width: '80%', margin: '0 auto', textAlign: 'center'}}
      >
        {recipes.map(recipe=>{
          return <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={recipe.id}><RecipeCard recipe={recipe}/></Grid>
        })}
      </Grid>
      <Box sx={{margin:'2rem'}}></Box>
    </div>
  )
};

export default SearchResults