import React, {useEffect, useState, Fragment, forwardRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  CircularProgress,
  IconButton,
  Collapse,
  Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { styled } from "@mui/material/styles";
import { CheckCircleOutline } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)
  const recipeId = location.pathname === 'savedRecipes' ? recipe.recipeId : recipe.id
  const favoriteIds = useSelector(state => state.auth.recipes?.map(recipe => recipe.recipeId))
  const [favorite, setFavorite] = useState(favoriteIds?.includes(recipeId) ? true : false)
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
  const [open, setOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitState, setSubmitState] = useState('')
  
  const ingredients = {
    missingIngredients,
    usedIngredients,
    unusedIngredients
  };
  const totalIngredients = recipeIngredients?.length
  const ingredientPercentage = (usedIngredients?.length/totalIngredients)*100

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} sx={{zIndex:1500}} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(saveIngredients(ingredients));
    navigate(`/recipe/${recipe.id}`);
  };

  const handleChange = e => {
    setExpanded(!expanded)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!user.id) {
      setSubmitMessage('You must be logged in to save recipes!')
      setSubmitState('fail');
      setOpen(true)
    }
    else if (favorite) {
      dispatch(removeSavedRecipe(recipe.id)); 
      setFavorite(false);
      setSubmitMessage('Recipe removed from favorites');
      setSubmitState('remove')
      setOpen(true)
    } else {
      dispatch(saveRecipe(recipe.id));
      setFavorite(true);
      setSubmitMessage('Recipe saved to favorites!');
      setSubmitState('save')
      setOpen(true)
    };
  };

  useEffect(()=>{
    setMissingIngredients(recipeIngredients?.filter(ingredient => !pantryIngredientIds?.includes(ingredient.id)));
    setUsedIngredients(recipeIngredients?.filter(ingredient => pantryIngredientIds?.includes(ingredient.id)));
    setUnusedIngredients(pantryIngredients?.filter(ingredient => !recipeIngredientsIds?.includes(ingredient.id)));
  }, [pantryIngredients])

  return (
    <Card sx={{maxWidth:'350px', position:'relative', opacity:1, width:'100%', minHeight:'460px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignSelf:'stretch'}}>
      <CardActionArea 
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", height:'240px', objectFit:'cover' }}
          image={recipe.image}
          alt={recipe.title}
        />
        <CardContent sx={{height:'155px', alignSelf:'stretch', display:'flex', flexDirection:'column', flexBasis:'40%', justifyContent:'space-between', padding:'.5rem .25rem 0 .25rem'}}>
          <Typography component="div" variant="h6" sx={{height:'stretch'}}>
            {recipe.title}
          </Typography>
          {
            !missingIngredients.length ? 
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly', }}>
              <Box sx={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                <Typography variant='subtitle1'>You have all the necessary ingredients!</Typography>
                <CheckCircleOutline sx={{color:'#2e7d32', fontSize:'3rem'}}/>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                <AccessTimeIcon/>
                <Typography variant='subtitle1'>{recipe.readyInMinutes}</Typography>
              </Box>
            </Box>
          :
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
              <Box sx={{display:'flex', justifyContent:'space-evenly', alignItems:'center', padding:'.5rem'}}>
                {ingredientPercentage === 0 ? <WarningIcon color='error' sx={{marginRight:'.5rem'}}/> : <CircularProgress thickness={4} sx={{margin:'1rem'}} variant='determinate' color={ingredientPercentage < 33 ? 'error' : ingredientPercentage < 66 ? 'warning' : 'success'} value={ingredientPercentage} />}
                <Typography variant='subtitle2' color='#2e7d32'>{usedIngredients?.length} of {totalIngredients} ingredients in stock</Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <AccessTimeIcon/>
                <Typography variant='subtitle1'>{recipe.readyInMinutes} minutes</Typography>
              </Box>
            </Box>
          }
        </CardContent>
      </CardActionArea>
      <IconButton onClick={(e)=> handleFavorite(e)} sx={{padding:'.5rem', position:'absolute', top:'0', right:'0'}}>
        {favorite ? <FavoriteIcon color='error'/> : <FavoriteBorderIcon/>}
      </IconButton>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{marginTop:'6vh'}}
      >
        <Alert 
          onClose={handleClose}
          severity={submitState === 'fail' ? 'error' : submitState === 'save' ? 'success' : 'warning'}
          sx={{width:'auto'}}
        >
          {submitMessage}
        </Alert>
      </Snackbar>
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
