import React, {useEffect, useState, Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  CardHeader,
  Typography,
  CircularProgress,
  IconButton,
  Collapse
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckCircleOutline } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { saveIngredients, saveRecipe, removeSavedRecipe } from "../../store";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  marginTop: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const pantryIngredients = useSelector(state => state.selectedPantry.ingredients);
  const pantryIngredientIds = pantryIngredients.map(ingredient => ingredient.id);
  let recipeIngredients;

  //if recipe comes from the saved recipes, it will have extendedIngredients.
  if(recipe.extendedIngredients)
    recipeIngredients = recipe.extendedIngredients;
  else
    recipeIngredients = recipe?.missedIngredients?.concat(recipe?.usedIngredients);
  const recipeIngredientsIds = recipeIngredients?.map(ingredient => ingredient.id);
  const [missingIngredients, setMissingIngredients] = useState([])
  const [usedIngredients, setUsedIngredients] = useState([])
  const [unusedIngredients, setUnusedIngredients] = useState([])
  
  const ingredients = {
    missingIngredients,
    usedIngredients,
    unusedIngredients
  };
  const totalIngredients = recipeIngredients?.length
  const ingredientPercentage = (usedIngredients?.length/totalIngredients)*100

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(saveIngredients(ingredients));
    navigate(`/recipe/${recipe.id}`);
  };

  const handleChange = e => {
    setExpanded(!expanded)
  }

  const handleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      dispatch(removeSavedRecipe(recipe.id)); 
      setFavorite(false);
    } else {
      dispatch(saveRecipe(recipe.id));
      setFavorite(true);
    };
  };

  useEffect(()=>{
    setMissingIngredients(recipeIngredients?.filter(ingredient => !pantryIngredientIds?.includes(ingredient.id)));
    setUsedIngredients(recipeIngredients?.filter(ingredient => pantryIngredientIds?.includes(ingredient.id)));
    setUnusedIngredients(pantryIngredients?.filter(ingredient => !recipeIngredientsIds?.includes(ingredient.id)));
  }, [pantryIngredients])

  return (
    <Card sx={{minHeight:'60vh', height:'auto', maxWidth:'35vw', display:'flex', flexDirection:'column', justifyContent:'space-between', alignSelf:'stretch'}}>
      <CardHeader 
        action={
        <IconButton onClick={(e)=> handleFavorite(e)} sx={{padding:0}}>
        {favorite ? <FavoriteIcon color='error'/> : <FavoriteBorderIcon/>}
        </IconButton>
        } 
      />
      <CardActionArea 
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", height:'240px' }}
          image={recipe.image}
          alt={recipe.title}
        />
        <CardContent sx={{height:'155px', alignSelf:'stretch', display:'flex', flexDirection:'column', flexBasis:'40%', justifyContent:'space-between', padding:'.5rem .25rem 0 .25rem'}}>
          <Typography component="div" variant="h6" sx={{height:'stretch'}}>
            {recipe.title}
          </Typography>
          {
            !recipe.missedIngredientCount ? 
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly', }}>
              <Typography variant='subtitle1'>You have all the necessary ingredients!</Typography>
              <CheckCircleOutline sx={{color:'#2e7d32', fontSize:'3rem'}}/>
            </Box>
          : ingredientPercentage === 0 ?
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly', }}>
              <Typography variant='subtitle1'>You have none of the necessary ingredients!</Typography>
              <WarningIcon color='error'/>
            </Box>
          :
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
              <Typography variant='subtitle2' color='#ed6c02'>Missing {missingIngredients?.length} {missingIngredients?.length === 1 ? 'ingredient' : 'ingredients'}</Typography>
                <CircularProgress thickness={6} sx={{margin:'1rem'}} variant='determinate' color={ingredientPercentage < 33 ? 'error' : ingredientPercentage < 66 ? 'warning' : 'success'} value={ingredientPercentage} />
              <Typography variant='subtitle2' color='#2e7d32'>Using {usedIngredients?.length} pantry {usedIngredients?.length === 1 ? 'ingredient' : 'ingredients'}</Typography>
            </Box>
          }
        </CardContent>
      </CardActionArea>
      {recipe.summary ?
      <Fragment>
        <CardActions id='actions' sx={{justifySelf:'flex-end', flexBasis:'10%', height:'100%', padding:0}}>
          <ExpandMore
            expand={expanded}
            onClick={handleChange}
            aria-expanded={expanded}
            aria-label="show more"
            align='bottom'
            title='Recipe Details'
          >
            {!expanded ? <Typography>Recipe Info</Typography> : null}
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography dangerouslySetInnerHTML={{__html: recipe.summary}} />
          </CardContent>
        </Collapse>
      </Fragment>
       : null}
    </Card>
  );
};

export default RecipeCard;
