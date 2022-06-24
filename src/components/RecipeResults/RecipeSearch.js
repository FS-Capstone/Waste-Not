import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdvancedSearch from './AdvancedSearch';
import SearchResults from './SearchResults';
import { Box, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';
import { fetchComplexRecipes, fetchMoreRecipes } from '../../store';


const RecipeSearch = () => {
  const theme = useTheme()
  const recipes = useSelector(state => state.recipes)
  const [showLoadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [value, setValue] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [diet, setDiet] = useState('');
  const [meal, setMeal] = useState('');
  const [number, setNumber] = useState(12);
  const dispatch = useDispatch();

  const handleComplexSearch = async(e) => {
    const options = {
      query: searchValue,
      cuisine,
      type: meal,
      diet,
      intolerances: value.join(','),
      offset: 0,
      number: number
    }
    await dispatch(fetchComplexRecipes(options))
    setLoadMore(true)
  }

  const handleLoadMore = async(e) => {
    const options = {
      query: searchValue,
      cuisine,
      type: meal,
      diet,
      intolerances: value.join(','),
      offset: recipes.length +1,
      number: number
    }
    dispatch(fetchMoreRecipes(options))
  }

  const handleCuisine = e => {
    setCuisine(e.target.value)
  }

  const handleDiet = e => {
    setDiet(e.target.value)
  };

  const handleMeal = e => {
    setMeal(e.target.value)
  }

  const handleComplexSearchChange = e => {
    setSearchValue(e.target.value)
  }

  const handleNumChange = (e) => {
    setNumber(e.target.value);
  };
  
  return(
    <Box 
      className='top-level-page'
      sx={{
      width:'100vh%',
      height:'100%',
      minHeight:'100vh',
      backgroundImage:'url("/images/background14.jpg")',
      backgroundSize:'cover',
      backgroundAttachment:'fixed',
      display:'flex',
      justifyContent:'center'
    }}>
      <Paper
      sx={{
        padding: '40px 0 40px 0',
        margin: '40px 0 40px 0',
        opacity:'.9', 
        display:'flex', 
        justifyContent:'center', 
        width:'80vw',
        height:'auto',
        backgroundColor:`${theme.palette.background.paper}`}}>
        <Box sx={{display:'flex', width:'100%', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', }}>
          <AdvancedSearch 
            handleComplexSearch={handleComplexSearch} 
            searchValue={searchValue} 
            value={value} 
            number={number}
            setValue={setValue} 
            handleCuisine={handleCuisine}
            handleDiet={handleDiet}
            handleMeal={handleMeal}
            handleComplexSearchChange={handleComplexSearchChange}
            handleNumChange={handleNumChange}
            />
          <SearchResults showLoadMore={showLoadMore} setOffset={setOffset} handleLoadMore={handleLoadMore}/>
          {/* Add images / info on how to use search here, only displayed if recipes.length is false */}
        </Box>
      </Paper>
    </Box>
  )
};

export default RecipeSearch;