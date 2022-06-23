import { Box } from '@mui/material';
import React from 'react';
import PantryList from './PantryList';
import SearchWithPantry from '../RecipeResults/SearchWithPantry';
import SearchResults from '../RecipeResults/SearchResults';
import { useTheme } from '@emotion/react';
import { Paper } from '@mui/material';

export default function Pantry() {
  const theme = useTheme();
  return (
    <Box className='top-level-page'
    sx={{

      width: '100vh%', 
      height: '100%', 
      backgroundImage:'url("images/background19.jpg")', 
      backgroundSize:'contain',
      backgroundAttachment:'fixed',
      display:'flex',
      
      justifyContent:'center'}}>
      <Paper 
        className='search-and-results'
      sx={{
        
        padding: '40px 0 40px 0',
        margin: '40px 0 40px 0',
        opacity:'.95', 
        display:'flex', 
        justifyContent:'center', 
        width:'60vw',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <PantryList/>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}} >
          <SearchWithPantry/>
          <SearchResults/>
        </Box>
      </Paper>

    </Box>
  )
}
