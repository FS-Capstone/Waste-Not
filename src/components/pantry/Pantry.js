
import { Box, Typography } from '@mui/material';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PantryList from './PantryList';
import SearchWithPantry from '../RecipeResults/SearchWithPantry';
import SearchResults from '../RecipeResults/SearchResults';
import { useTheme } from '@emotion/react';
import { Paper } from '@mui/material';
import { fetchRecipes, fetchMoreRecipes } from '../../store';

export default function Pantry() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showLoadMore, setShowLoadMore] = useState(false)
  const recipes = useSelector(state => state.ingredientRecipes)
  const [number, setNumber] = useState(12);
  const [ranking, setRanking] = useState('max-used-ingredients');
  const [loading, setLoading] = useState(false)

  const handleLoadMore = async(e) => {
    e.preventDefault();
    setLoading(true)
    const selectedIngredients = JSON.parse(window.localStorage.getItem("selectedIngredients"));
    const offset = recipes.length + 1
    await dispatch(fetchMoreRecipes(selectedIngredients, number, ranking, offset));
    setLoading(false)
  }

  const handleRankChange = (e) => {
    setRanking(e.target.value);
  };

  const recipeSearch = async (e) => {
    e.preventDefault();
    setLoading(true)
    const selectedIngredients = JSON.parse(window.localStorage.getItem("selectedIngredients"));
    // if (selectedIngredients.length) {
    await dispatch(fetchRecipes(selectedIngredients, number, ranking));
    setLoading(false)
    setShowLoadMore(true)
    // } else {
    //   const ingredients = pantry?.ingredients;
    //   dispatch(fetchRecipes(ingredients, number, ranking));
    // }
  };

  const handleNumChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <Box
      className="top-level-page"
      sx={{
        width: "100vh%",
        height: "100%",
        backgroundImage: 'url("images/background19.jpg")',
        backgroundSize: "contain",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper sx={{
        padding: '40px',
        margin: '40px 0 40px 0',
<<<<<<< HEAD
        opacity:'.95', 
        display:'flex', 
        justifyContent:'space-between', 
        width:'80vw',
        minHeight: '100vh',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <Typography variant='h5' display={'block'}>Search for Recipes</Typography>
        <Typography variant='textSecondary'>Select Ingredients From Your Pantry to Find Recipes</Typography>
        <PantryList/>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'space-between', flexBasis:'66%'}} >
          <SearchWithPantry  handleRankChange={handleRankChange} handleNumChange={handleNumChange} ranking={ranking} number={number} recipeSearch={recipeSearch} />
<<<<<<< HEAD
          <SearchResults loading={loading} showLoadMore={showLoadMore} handleLoadMore={handleLoadMore} />
        </Box> 
=======
          <div style={{border:'1px solid grey', height:'100%', color:'grey', margin:'20px'}}>Search to find recipes</div>
          {/* <SearchResults showLoadMore={showLoadMore} handleLoadMore={handleLoadMore} /> */}
        </Box>
>>>>>>> 9a7b074 (styling pantry)
=======
        opacity:'.95',
        backgroundColor:`${theme.palette.background.paper}`
      }}>
        <Box sx={{margin: '0 0 2em 0', color:'gray'}}>
          <Typography  variant='h5' sx={{marginBottom:'1em'}}>Search for Recipes</Typography>
          <Typography  variant='textSecondary'>Select Ingredients From Your Pantry to Find Recipes</Typography>
        </Box>
        <Box
          className="search-and-results"
          sx={{
        
           
          display:'flex', 
          justifyContent:'space-between', 
          width:'80vw',
          minHeight: '100vh'}}>
          <PantryList/>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'space-between', flexBasis:'66%'}} >
            <SearchWithPantry  handleRankChange={handleRankChange} handleNumChange={handleNumChange} ranking={ranking} number={number} recipeSearch={recipeSearch} />
            <div style={{border:'1px solid grey', height:'100%', color:'grey', margin:'20px'}}>Search to find recipes</div>
            {/* <SearchResults showLoadMore={showLoadMore} handleLoadMore={handleLoadMore} /> */}
          </Box>
        </Box>
        
>>>>>>> 412ae93 (styling pantry)
      </Paper>
    </Box>
  );
}
