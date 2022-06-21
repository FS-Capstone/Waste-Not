/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Chip,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Autocomplete
} from "@mui/material";
import { addMultiplePantryItems, fetchRecipes, addMultipleShoppingItems, fetchComplexRecipes } from "../../store";
import RecipeCard from "./RecipeCard";

const SearchResults = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const pantry = useSelector((state) => state.selectedPantry);
  const ingredients = useSelector(state => state.ingredients)
  const pantryIngredientIds = pantry?.ingredients?.map(ingredient => ingredient.id)
  const user = useSelector(state=> state.auth)
  const shoppingList = useSelector(state => state.shoppingList);
  const listIds = shoppingList.map(ingredient => ingredient.id);
  const [number, setNumber] = useState(12);
  const [ranking, setRanking] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [meal, setMeal] = useState('');
  const [value, setValue] = useState([]);
  const numValues = [6, 12, 18, 24, 48, 96];
  const cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean', 'latin american']
  const diets = ['pescetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'paleo', 'primal', 'vegetarian'];
  const meals = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread','breakfast', 'soup', 'beverage', 'sauce', 'drink'];
  const rankingValues = [
    { display: "Maximize Used Ingredients", value: 1 },
    { display: "Minimize Missing Ingredients", value: 2 },
  ];

  //get flattened array of all missing ingredients from recipes in state, then filter for duplicate values
  const missingIngredientsData = recipes
    .map((recipe) =>
      recipe.missedIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
      }))
    )
    .flat();
  const uniqueIngredients = new Set();
  const missingIngredients = missingIngredientsData.filter((ingredient) => {
    const isDuplicate = uniqueIngredients.has(ingredient.id);
    uniqueIngredients.add(ingredient.id);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });

  let missingIngredientsRenamed;

  const [missingIngredientList, setMissingIngredientList] = useState([]);

  const [selectedMissingIngredients, setSelectedMissingIngredients] = useState([]);

  useEffect(() => {
    missingIngredientsRenamed = missingIngredients
      .map((ingredient) => {
        const trueIngredient = ingredients.find(
          (trueIngredient) => trueIngredient.id === ingredient.id
        );
        if (trueIngredient) {
          return { id: ingredient.id, name: trueIngredient.name };
        }
        // add new ingredient to database, get nutrition info if possible
        return {};
      })
      .filter(
        (ingredient) => !pantryIngredientIds.includes(ingredient.id)
      );
    setMissingIngredientList(missingIngredientsRenamed);
  }, [recipes, pantry]);

  const handleClick = (e, ingredient) => {
    e.preventDefault();
    selectedMissingIngredients.includes(ingredient)
      ? setSelectedMissingIngredients(
          selectedMissingIngredients.filter(
            (_ingredient) => _ingredient.id !== ingredient.id
          )
        )
      : setSelectedMissingIngredients([
          ...selectedMissingIngredients,
          ingredient,
        ]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const ingredientIds = selectedMissingIngredients.map(ingredient => ingredient.id)
    dispatch(addMultiplePantryItems(ingredientIds, pantry.id));
    setSelectedMissingIngredients([])
  };

  const addToList = e => {
    e.preventDefault();
    const dupesRemoved = selectedMissingIngredients.filter(ingredient => !listIds.includes(ingredient.id))
    dispatch(addMultipleShoppingItems(dupesRemoved, user.id))
    setSelectedMissingIngredients([])
  }

  const recipeSearch = async (e) => {
    e.preventDefault();
    const selectedIngredients = window.localStorage.getItem(
      "selectedIngredients"
    )
      ? window.localStorage.getItem("selectedIngredients")
      : [];
    if (selectedIngredients.length) {
      dispatch(fetchRecipes(selectedIngredients, number, ranking));
    } else {
      const ingredients = pantry?.ingredients;
      dispatch(fetchRecipes(ingredients, number, ranking));
    }
  };

  const handleNumChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRankChange = (e) => {
    setRanking(e.target.value);
  };

  const handleCuisine = e => {
    setCuisine(e.target.value)
    console.log(cuisine)
  }

  const handleDiet = e => {
    setDiet(e.target.value)
  };

  const handleMeal = e => {
    setMeal(e.target.value)
  }

  const handleComplexSearch = e => {
    const options = {
      query: searchValue,
      cuisine,
      type: meal,
      diet,
      intolerances: value.join(',')
    }
    dispatch(fetchComplexRecipes(options))
  }

  const handleComplexSearchChange = e => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <Box id='searchContainer' sx={{display:'flex', justifyContent:'center'}}>
        <Box id='complexSearchBox' sx={{display:'flex', flexDirection:'column', justifyContent:'center', flexBasis:'40%', margin:'1rem'}}>
          <div><TextField id='complexSearch' variant='outlined' name='searchValue' onChange={handleComplexSearchChange} value={searchValue} placeholder='Search for a recipe!' sx={{width:'80%'}}/>{!showAdvanced ? <Button size='small' onClick={()=> setShowAdvanced(true)}>Advanced Search</Button> : <Button size='small' onClick={()=> setShowAdvanced(false)}>Hide Advanced Search</Button>}</div>
          
          {showAdvanced ? <Box>
            <Box sx={{margin:'1rem'}}>
              <TextField id='cuisineSelect' size='small' variant='outlined' select onChange={handleCuisine} defaultValue='' label='Select a Cuisine' sx={{width:'30%'}} ><MenuItem value='' >Select a Cuisine Type</MenuItem>{cuisines.map(cuisine => <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>)}</TextField>
              <TextField id='dietSelect' size='small' variant='outlined' select onChange={handleDiet} defaultValue='' label='Select a Diet Type' sx={{width:'30%'}}><MenuItem value='' >Select a Diet Type</MenuItem>{diets.map(diet => <MenuItem key={diet} value={diet}>{diet}</MenuItem>)}</TextField>
              <TextField id='mealSelect' size='small' variant='outlined' select onChange={handleMeal} defaultValue='' label='Select a Meal Type' sx={{width:'30%'}}><MenuItem value='' >Select a Meal Type</MenuItem>{meals.map(meal => <MenuItem key={meal} value={meal}>{meal}</MenuItem> )}</TextField>
            </Box>
            <Box sx={{display:'flex', margin: '1rem'}}>
              <Autocomplete 
                multiple 
                id='intoleranceSelect'
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                options={ingredients.map(ingredient => ingredient.name)} 
                getOptionLabel={(option) => option} 
                // defaultValue={[ingredients[0]?.name]} 
                freeSolo
                renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({index})} /> )}
                filterSelectedOptions  
                renderInput={params => ( <TextField {...params} label='Intolerances' placeholder='Intolerances' />)} 
                sx={{width:'80%'}}
                />
              <TextField id='maxTimeSelect' type='number' inputProps={{min:10}} label='Max Prep Time'/>

            </Box>
          </Box> : null}
          <Button variant='contained' onClick={(e)=> handleComplexSearch(e)}>Search</Button>
        </Box>
        <Box
          id='ingredientSearchBox'
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          <Button
            variant="outlined"
            sx={{ paddingLeft: "4.2rem", paddingRight: "4.12rem" }}
            onClick={(e) => recipeSearch(e)}
          >
            Search for recipes!
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              id="resultsNumber"
              select
              value={number}
              onChange={handleNumChange}
            >
              {numValues.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              id="ranking"
              select
              value={ranking}
              onChange={handleRankChange}
            >
              {rankingValues.map((ranking) => (
                <MenuItem key={ranking.value} value={ranking.value}>
                  {ranking.display}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "1rem auto 1rem auto",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifySelf: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {!missingIngredientList.length ? null : (
            <Typography variant="h6">
              Already have some of these ingredients?
            </Typography>
          )}
        </Box>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {!missingIngredientList.length
            ? null
            : !showAll ? missingIngredientList.slice(0,15).map((ingredient) =>
                ingredient.id ? (
                  <Chip
                    key={ingredient.id}
                    variant={
                      selectedMissingIngredients.includes(ingredient)
                        ? "filled"
                        : "outlined"
                    }
                    clickable
                    label={ingredient.name}
                    onClick={(e) => handleClick(e, ingredient)}
                    sx={{ margin: "3px" }}
                  />
                ) : null
              ) : missingIngredientList.map((ingredient) =>
              ingredient.id ? (
                <Chip
                  key={ingredient.id}
                  variant={
                    selectedMissingIngredients.includes(ingredient)
                      ? "filled"
                      : "outlined"
                  }
                  clickable
                  label={ingredient.name}
                  onClick={(e) => handleClick(e, ingredient)}
                  sx={{ margin: "3px" }}
                />
              ) : null
            )}
            {!showAll && missingIngredientList.length ? 
            <Chip variant='outlined' clickable label={`+ ${missingIngredientList.length - 15} more...`} onClick={() => setShowAll(true)} sx={{margin:'3px'}} />
            : null }
            {showAll && missingIngredientList.length ? <Chip variant='outlined' clickable label='Hide extra ingredients' onClick={() => setShowAll(false)} sx={{margin:'3px'}} /> : null}
          {!selectedMissingIngredients.length ? null : (
            <div>
              <Button sx={{marginRight:'2rem'}} variant="contained" onClick={(e) => handleSave(e)}>
                Add Selected Ingredients to Pantry
              </Button>
              <Button variant='outlined' onClick={(e) => addToList(e)}>
                Add Selected Ingredients to Shopping List
              </Button>
            </div>

          )}
        </Box>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        columnSpacing={2}
        sx={{ width: "80%", margin: "0 auto", textAlign: "center" }}
      >
        {recipes.map((recipe) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ margin: "2rem" }}></Box>
    </div>
  );
};

export default SearchResults;
