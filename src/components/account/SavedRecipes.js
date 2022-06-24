import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { SavedRecipeCard } from './SavedRecipeCard';
import { useTheme } from '@emotion/react';

export default function SavedRecipes() {
  let recipes = useSelector(state => state.auth.recipes || []);
  const theme = useTheme()
  const availableIngredientIds = useSelector(state => state.selectedPantry.ingredients?.map(ingredient => ingredient.id))

 // need to fix line 17-18 because recipe[0] might be createdByUser (therefore no recipeId),
 // even if there are other recipes ([1], etc) that DO have recipeIds.
//  console.log("from saved recipes component", recipes)
//  const savedRecipes = recipes.filter(recipe => recipe.createdByUser === false);
//  console.log("where are my saved recipes?", savedRecipes)

  if(!recipes[0]?.recipeId || !availableIngredientIds)
    return null;

  return(
    <Box 
    className='top-level-page'
    sx={{
    width:'100vh%',
    height:'100%',
    backgroundImage:'url("/images/RecipesBackground.png")',
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
        flexDirection: 'column',
        alignItems:'center', 
        width:'80vw',
        minHeight: '100vh',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <Typography variant='h2' sx={{fontFamily: 'Kalam'}}>My Recipes</Typography>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          spacing={2}
          columnSpacing={2}
          sx={{width: '90%', margin: '0 auto 2rem auto', textAlign:'center'}}
        >
        {recipes.map(recipe => {
          return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={recipe.recipeId}>
            <SavedRecipeCard key={recipe.id} recipeId={recipe.recipeId}/>
          </Grid>
          )
        })}
        </Grid>
      </Paper>

    </Box>
  )
}