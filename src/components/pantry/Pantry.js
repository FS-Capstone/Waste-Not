
import { Box, Divider, Typography, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, {useState, useEffect, forwardRef} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PantryList from './PantryList';
import SearchWithPantry from '../RecipeResults/SearchWithPantry';
import SearchResults from '../RecipeResults/SearchResults';
import { useTheme } from '@emotion/react';
import { fetchRecipes, fetchMoreRecipes, clearSearchResults } from '../../store';
import RecipePlaceholder from './RecipePlaceholder';

export default function Pantry() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showLoadMore, setShowLoadMore] = useState(false)
  const recipes = useSelector(state => state.ingredientRecipes)
  const [number, setNumber] = useState(12);
  const [ranking, setRanking] = useState('max-used-ingredients');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false)
  const haveRecipes = useSelector(state => state.ingredientRecipes.length > 0);

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

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(()=> {window.scrollTo(0,0)},[])

  const recipeSearch = async (e) => {
    await dispatch(clearSearchResults())
    e.preventDefault();
    const selectedIngredients = JSON.parse(window.localStorage.getItem("selectedIngredients"));
    if (!selectedIngredients.length) {
      setSubmitMessage('You must select at least one ingredient to search with!')
      setOpen(true)
    }
    else {
      setLoading(true)
      await dispatch(fetchRecipes(selectedIngredients, number, ranking));
      setLoading(false)
      setShowLoadMore(true)
    }
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
        padding: '40px',
        margin: '40px 0 40px 0',
        opacity:'.95', 
        width:'80vw',
        minHeight: '100vh',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <Box sx={{color:'gray', margin:'0 0 2em 0' }} >
          <Typography variant='h5' sx={{marginBottom:'.5em'}}>Search for Recipes</Typography>
          <Typography variant='textSecondary' sx={{marginBottom:'.5em'}}>Select Ingredients From Your Pantry and Search for Recipes with them</Typography>
          <Divider sx={{marginTop:'2em'}}/>
        </Box>
        
        <Box
          className="search-and-results"
          sx={{
          
            display:'flex', 
            justifyContent:'space-between', 
        }}>
          <PantryList/>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'space-between', flexBasis:'66%'}} >
            <SearchWithPantry  handleRankChange={handleRankChange} handleNumChange={handleNumChange} ranking={ranking} number={number} recipeSearch={recipeSearch} />
            {haveRecipes || loading ?
              <SearchResults loading={loading} showLoadMore={showLoadMore} handleLoadMore={handleLoadMore} />
              :
              <RecipePlaceholder/>
            }
            
          </Box> 
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{marginTop:'5vh'}}
      >
        <Alert 
          onClose={handleClose}
          severity={'error'}
          sx={{width:'auto'}}
        >
          {submitMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
