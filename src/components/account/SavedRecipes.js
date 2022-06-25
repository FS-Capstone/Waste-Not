import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Paper, Typography, Button } from '@mui/material';
import { SavedRecipeCard } from './SavedRecipeCard';
import { useTheme } from '@emotion/react';

export default function SavedRecipes() {
  let recipes = useSelector(state => state.auth.recipes || []);
  const savedRecipes = recipes.filter(recipe => recipe.createdByUser === false);
  const theme = useTheme()
  const navigate = useNavigate();


  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

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
        <Typography variant='h2' sx={{fontFamily: 'Kalam'}}>My Saved Recipes</Typography>
        {!recipes.length ?
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'4rem '}}>
          <Typography gutterBottom variant='h3'>You haven't saved any recipes yet</Typography>
          <Button variant='contained' onClick={()=>navigate('/advancedSearch')}>Get Started Here!</Button>
        </Box>
        :
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          spacing={2}
          columnSpacing={2}
          sx={{width: '90%', margin: '0 auto 2rem auto', textAlign:'center'}}
        >
        {savedRecipes?.map(recipe => {
          return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={recipe.recipeId}>
            <SavedRecipeCard recipeId={recipe.recipeId}/>
          </Grid>
          )
        })}
        </Grid>}
      </Paper>

    </Box>
  )
}