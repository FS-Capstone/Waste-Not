import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import AdvancedSearch from './AdvancedSearch';
import SearchResults from './SearchResults';
import { Box, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';



const RecipeSearch = () => {
  const theme = useTheme()
  const recipes = useSelector(state => state.recipes)
  return(
    <Box 
      className='top-level-page'
      sx={{
      width:'100vh%',
      height:'100%',
      backgroundImage:'url("/images/background14.jpg")',
      backgroundSize:'contain',
      backgroundAttachment:'fixed',
      display:'flex',
      justifyContent:'center'
    }}>
      <Paper
      sx={{
        padding: '40px 0 40px 0',
        margin: '40px 0 40px 0',
        opacity:'.95', 
        display:'flex', 
        justifyContent:'center', 
        width:'80vw',
        height: recipes.length ? 'auto' : '100vh',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <Box sx={{display:'flex', width:'100%', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', }}>
          <AdvancedSearch/>
          <SearchResults/>
          {/* Add images / info on how to use search here, only displayed if recipes.length is false */}
        </Box>
      </Paper>
    </Box>
  )
};

export default RecipeSearch;