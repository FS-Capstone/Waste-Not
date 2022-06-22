import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PantryIcon from './PantryIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PantryAutocomplete from '../PantryAutocomplete';
import { ingredientList } from "../../../script/seedData";
import Carousel from "react-elastic-carousel";
import PantryList from './PantryList';
import SearchWithPantry from '../RecipeResults/SearchWithPantry';
import AdvancedSearch from '../RecipeResults/AdvancedSearch';

export default function Pantry() {
  return (
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <PantryList/>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <SearchWithPantry/>
      </Box>
    </Box>
  )
}