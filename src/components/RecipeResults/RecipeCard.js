import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';


const RecipeCard = ({recipe}) => {

  return(
    <Card sx={{display:'flex', alignItems:'stretch', minHeight:'20vh', height:'100%'}}>
      <CardMedia component='img' sx={{width:'33%'}} image={recipe.image} alt={recipe.title}/>
      <Box sx={{width:'100%', height:'100%'}}>
        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Typography component='div' variant='h5'>{recipe.title}</Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>Missing {recipe.missedIngredientCount} ingredients</Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>{recipe.usedIngredientCount} pantry ingredients used</Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>{recipe.unusedIngredientCount ? recipe.unusedIngredientCount : 'No'} unused pantry ingredients</Typography>
        </CardContent>
      </Box>
    </Card>
  )
};

export default RecipeCard