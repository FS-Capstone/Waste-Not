import React, {useEffect, useState} from 'react';
import {Paper, Box, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// import kalamLight from '../../../public/fonts/Kalam-Light.ttf';

//grocery_list has 17 lines
const ShoppingList = () => {
  const [hidden, setHidden] = useState(false)
  
  const ingredients = ['pita bread', 'garlic', 'cashew', 'white onions', 'tomato paste', 'fresh bread', 'bananas', 'strawberries', 'grapes', 'ice cream', 'bourbon', 'hershey chocolate', 'marshmallows', 'graham crackers', 'spaghetti', 'potatoes', 'butternut squash', 'black pepper', 'flour', 'almond flour', '2% milk', 'raw almonds', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36' ]

  const handleDelete = (e, ingredient) => {
    e.preventDefault()
    console.log('ingredient deleted')
  }

  return (
    <Box sx={{display:'flex', marginTop:'5vh', flexDirection:'column', height:'auto', alignItems:'center', width:'100vw'}}>
      <Paper sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:'2vh', height:'100%', width:'100%', maxWidth:'800px', minWidth:'360px', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
        <Typography variant='h2' sx={{marginTop:'1rem', marginBottom:'1rem', fontFamily:'Kalam', borderBottom:'3px solid black'}}>Shopping List</Typography>
        <Box sx={{width:'80%', marginBottom:'1rem'}}>
        {ingredients.map(ingredient => <Typography key={ingredient} sx={{marginBottom:'.32vh', fontFamily:'Kalam', borderBottom:'3px solid black'}} variant='h4'>{ingredient} {!hidden ? <IconButton onClick={(e)=> handleDelete(e, ingredient)}><DeleteIcon/></IconButton> : null}</Typography>)}
        </Box>
      </Paper>
    </Box>

  )
}

export default ShoppingList