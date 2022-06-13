import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PantryIcon from './PantryIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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

    <Box>
      {Object.keys(categoriesWithIngredients).map(category => {
        return <Stack className='shelf' key={category} direction='row' sx={{flexWrap:'wrap'}}>
          <Typography variant='h5' sx={{flexBasis: '100%'}}>{category}</Typography>
          {categoriesWithIngredients[category].map(ingredient =>{
            return <PantryIcon ingredient={ingredient} key={ingredient.id}/>
          })}
        </Stack>
      })}
    </Box>
    // <Box >
    //   {pantry.ingredients.map (ingredient => 

    //     <Box className='shelf' key={ingredient.id}>
    //       <PantryIcon ingredient={ingredient}/>
    //     </Box>)}
    // </Box>
  )
}