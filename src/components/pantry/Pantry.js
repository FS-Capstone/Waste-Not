import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PantryIcon from './PantryIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PantryAutocomplete from '../PantryAutocomplete';
import { ingredientList } from "../../../script/seedData";
import Carousel from "react-elastic-carousel";


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


export default function Pantry(){
  const pantry = useSelector(state => state.selectedPantry);

  if(!pantry.ingredients)
    return null;

  const categoriesWithIngredients = getAllCategories(pantry.ingredients);

  return(

    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <PantryAutocomplete selectedPantry={pantry} searchOptions={ingredientList} searchName='Add to Pantry'/>
      {Object.keys(categoriesWithIngredients).map(category => {
        return <Stack className='shelf' key={category} direction='row' sx={{flexWrap:'wrap', width:'400px', border: 'solid 1px black'}}>
          <Typography variant='h5' sx={{flexBasis: '100%'}}>{category}</Typography>
          <Carousel itemsToShow={4}>
            {categoriesWithIngredients[category].map(ingredient =>{
              return <PantryIcon ingredient={ingredient} key={ingredient.id}/>

              
            })}
          </Carousel>
        </Stack>
      })}
    </Box>
  )
}