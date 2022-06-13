import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PantryIcon from './PantryIcon';

export default function Pantry(){
  const pantry = useSelector(state => state.selectedPantry);

  if(!pantry.ingredients)
    return null;

  return(
    <Box >
      {pantry.ingredients.map (ingredient => 
        <Box className='shelf' key={ingredient.id}>
          <PantryIcon ingredient={ingredient}/>
        </Box>)}
    </Box>
  )
}