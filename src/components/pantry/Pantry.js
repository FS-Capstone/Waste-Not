
import { Box } from '@mui/material';
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
  const recipes = useSelector(state => state.recipes)
  const [number, setNumber] = useState(12);
  const [ranking, setRanking] = useState('max-used-ingredients');

  const handleLoadMore = e => {
    e.preventDefault();
    const selectedIngredients = JSON.parse(window.localStorage.getItem("selectedIngredients"));
    const offset = recipes.length + 1
    dispatch(fetchMoreRecipes(selectedIngredients, number, ranking, offset));
  }

  const handleRankChange = (e) => {
    setRanking(e.target.value);
  };

  const recipeSearch = async (e) => {
    e.preventDefault();
    const selectedIngredients = JSON.parse(window.localStorage.getItem("selectedIngredients"));
    // if (selectedIngredients.length) {
    await dispatch(fetchRecipes(selectedIngredients, number, ranking));
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
      <Paper
        className="search-and-results"
        sx={{
       
        padding: '40px 0 40px 0',
        margin: '40px 0 40px 0',
        opacity:'.95', 
        display:'flex', 
        justifyContent:'center', 
        width:'80vw',
        minHeight: '100vh',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <PantryList/>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'space-between'}} >
          <SearchWithPantry  handleRankChange={handleRankChange} handleNumChange={handleNumChange} ranking={ranking} number={number} recipeSearch={recipeSearch} />
          <SearchResults showLoadMore={showLoadMore} handleLoadMore={handleLoadMore} />
        </Box>
      </Paper>
    </Box>
  );
}
