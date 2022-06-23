import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Chip,
  Button,
  TextField,
  MenuItem,
  Autocomplete
} from "@mui/material";
import {fetchComplexRecipes, clearSearchResults } from "../../store";

export default function AdvancedSearch({setSearched}) {
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

  const handleComplexSearch = async(e) => {
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

  // useEffect(()=> {
  //   dispatch(clearSearchResults());
  // },[])

  if(!showAdvanced) return (
    <Box id='complexSearchBox' sx={{display:'flex', width:'50%', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', margin:'1rem'}}>
      <Box sx={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'1rem'}}>
        <TextField id='complexSearch' variant='outlined' name='searchValue' onChange={handleComplexSearchChange} value={searchValue} placeholder='Search for a recipe!' sx={{width:'75%'}}/>
        <Button size='small' variant='outlined' onClick={()=> setShowAdvanced(true)}>Advanced Search</Button>
      </Box>
      <Button variant='contained' sx={{width:'100%'}} onClick={(e)=> handleComplexSearch(e)}>Search</Button>
    </Box>
  )
  return (
    <Box id='complexSearchBox' sx={{display:'flex', width:'50%', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', margin:'1rem'}}>
      <Box sx={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'1rem'}}>
        <TextField id='complexSearch' variant='outlined' name='searchValue' onChange={handleComplexSearchChange} value={searchValue} placeholder='Search for a recipe!' sx={{width:'65%'}}/>
        <Button size='small' variant='outlined' onClick={()=> setShowAdvanced(false)}>Hide Advanced Search</Button>
      </Box>
      <Box sx={{display:'flex', flexDirection:'column', width:'100%', marginBottom:'1rem'}}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <TextField id='cuisineSelect' size='small' variant='outlined' select onChange={handleCuisine} defaultValue='' label='Select a Cuisine' sx={{width:'30%'}} ><MenuItem value='' >Select a Cuisine Type</MenuItem>{cuisines.map(cuisine => <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>)}</TextField>
          <TextField id='dietSelect' size='small' variant='outlined' select onChange={handleDiet} defaultValue='' label='Select a Diet Type' sx={{width:'30%'}}><MenuItem value='' >Select a Diet Type</MenuItem>{diets.map(diet => <MenuItem key={diet} value={diet}>{diet}</MenuItem>)}</TextField>
          <TextField id='mealSelect' size='small' variant='outlined' select onChange={handleMeal} defaultValue='' label='Select a Meal Type' sx={{width:'30%'}}><MenuItem value='' >Select a Meal Type</MenuItem>{meals.map(meal => <MenuItem key={meal} value={meal}>{meal}</MenuItem> )}</TextField>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', marginTop:'1rem'}}>
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
            sx={{width:'65%'}}
            />
          <TextField id='maxTimeSelect' type='number' inputProps={{min:10}} label='Max Prep Time'/>

        </Box>
      </Box>
      <Button variant='contained' sx={{width:'100%'}} onClick={(e)=> handleComplexSearch(e)}>Search</Button>
    </Box>
  )

}
