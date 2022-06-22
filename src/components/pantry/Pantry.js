import { Box } from '@mui/material';
import React from 'react';
import PantryList from './PantryList';
import SearchWithPantry from '../RecipeResults/SearchWithPantry';
import SearchResults from '../RecipeResults/SearchResults';


export default function Pantry() {
  return (
    <Box sx={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      <PantryList/>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
        <SearchWithPantry/>
      </Box>
      <Box sx={{flexBasis: '100%'}}>
        <SearchResults/>
      </Box>
    </Box>
  )
}