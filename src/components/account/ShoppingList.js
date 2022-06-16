import React from 'react';
import {Paper, Box, Typography} from '@mui/material';
import groceryList from '../../../public/images/Grocery_List.jpg';
// import kalamLight from '../../../public/fonts/Kalam-Light.ttf';

//grocery_list has 17 lines
const ShoppingList = () => {

  const ingredients = ['pita bread', 'garlic', 'cashew', 'white onions', 'tomato paste', 'fresh bread', 'bananas', 'strawberries', 'grapes', 'ice cream', 'bourbon', 'hershey chocolate', 'marshmallows', 'graham crackers', 'spaghetti', 'potatoes', 'butternut squash']

  return (
    <Box sx={{display:'flex', justifyContent:'center', width:'100vw'}}>
      <Paper sx={{marginTop:'5vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundImage:`url(${groceryList})`, height:'80vh', width:'50vw', maxWidth:'800px', minWidth:'360px', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
        <Box sx={{position:'relative', top:'15.8%', right:'25.5%'}}>
        {ingredients.map(ingredient => <Typography key={ingredient} sx={{marginBottom:'1.1vh', fontFamily:'Kalam'}} variant='h6'>{ingredient}</Typography>)}
        </Box>
      </Paper>
    </Box>

  )
}

export default ShoppingList