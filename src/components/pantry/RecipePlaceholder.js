import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function RecipePlaceholder(){
  return(
    <Box sx={{
      height:'100%',
      margin:'5em',
      border:'1px solid gray',
      borderRadius: '20px',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <Typography color='gray' variant='h6' mb='2em'>Search to Find Recipes!</Typography>
      <img src='/images/Recipe-Icon.png' alt='' style={{color:'gray'}}/>
    </Box>
  )
}