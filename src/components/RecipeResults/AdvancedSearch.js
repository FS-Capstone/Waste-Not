import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Chip,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Autocomplete
} from "@mui/material";
import { addMultiplePantryItems, fetchRecipes, addMultipleShoppingItems, fetchComplexRecipes } from "../../store";
import RecipeCard from "./RecipeCard";
import SearchWithPantry from "./SearchWithPantry";

export default function AdvancedSearch() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [value, setValue] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const ingredients = useSelector(state => state.ingredients);
  const [diet, setDiet] = useState('');
  const [meal, setMeal] = useState('');
  const dispatch = useDispatch();

  const cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean', 'latin american']
  const diets = ['pescetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'paleo', 'primal', 'vegetarian'];
  const meals = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread','breakfast', 'soup', 'beverage', 'sauce', 'drink'];

  const handleComplexSearch = e => {
    const options = {
      query: searchValue,
      cuisine,
      type: meal,
      diet,
      intolerances: value.join(',')
    }
    dispatch(fetchComplexRecipes(options))
  }


  const handleCuisine = e => {
    setCuisine(e.target.value)
    console.log(cuisine)
  }

  const handleDiet = e => {
    setDiet(e.target.value)
  };

  const handleMeal = e => {
    setMeal(e.target.value)
  }


  const handleComplexSearchChange = e => {
    setSearchValue(e.target.value)
  }
return (
  <Box id='complexSearchBox' sx={{display:'flex', flexDirection:'column', justifyContent:'center', flexBasis:'40%', margin:'1rem'}}>
          <div><TextField id='complexSearch' variant='outlined' name='searchValue' onChange={handleComplexSearchChange} value={searchValue} placeholder='Search for a recipe!' sx={{width:'80%'}}/>{!showAdvanced ? <Button size='small' onClick={()=> setShowAdvanced(true)}>Advanced Search</Button> : <Button size='small' onClick={()=> setShowAdvanced(false)}>Hide Advanced Search</Button>}</div>
          
          {showAdvanced ? <Box>
            <Box sx={{margin:'1rem'}}>
              <TextField id='cuisineSelect' size='small' variant='outlined' select onChange={handleCuisine} defaultValue='' label='Select a Cuisine' sx={{width:'30%'}} ><MenuItem value='' >Select a Cuisine Type</MenuItem>{cuisines.map(cuisine => <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>)}</TextField>
              <TextField id='dietSelect' size='small' variant='outlined' select onChange={handleDiet} defaultValue='' label='Select a Diet Type' sx={{width:'30%'}}><MenuItem value='' >Select a Diet Type</MenuItem>{diets.map(diet => <MenuItem key={diet} value={diet}>{diet}</MenuItem>)}</TextField>
              <TextField id='mealSelect' size='small' variant='outlined' select onChange={handleMeal} defaultValue='' label='Select a Meal Type' sx={{width:'30%'}}><MenuItem value='' >Select a Meal Type</MenuItem>{meals.map(meal => <MenuItem key={meal} value={meal}>{meal}</MenuItem> )}</TextField>
            </Box>
            <Box sx={{display:'flex', margin: '1rem'}}>
              <Autocomplete 
                multiple 
                id='intoleranceSelect'
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                options={ingredients.map(ingredient => ingredient.name)} 
                getOptionLabel={(option) => option} 
                // defaultValue={[ingredients[0]?.name]} 
                freeSolo
                renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({index})} /> )}
                filterSelectedOptions  
                renderInput={params => ( <TextField {...params} label='Intolerances' placeholder='Intolerances' />)} 
                sx={{width:'80%'}}
                />
              <TextField id='maxTimeSelect' type='number' inputProps={{min:10}} label='Max Prep Time'/>

            </Box>
          </Box> : null}
          <Button variant='contained' onClick={(e)=> handleComplexSearch(e)}>Search</Button>
        </Box>
)

}