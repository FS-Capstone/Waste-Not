import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deletePantryItem } from "../../store/pantry";

export default function PantryIcon({ingredient}){
  const dispatch = useDispatch();
  const selectedPantry = useSelector(state => state.selectedPantry);
  
  return(
    <Box  className='pantry-icon' sx={{height:'100%', width:'auto', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <IconButton 
        sx={{padding:0, alignSelf:'flex-end'}}
        size='small'
        color="secondary"
        onClick={() => dispatch(deletePantryItem(ingredient.id, selectedPantry.id))}
      >
        <DeleteIcon/>
      </IconButton>
      <img 
        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
        alt='' 
        className="ingredient-icon-image"
        style={{maxHeight:'75px', maxWidth:'75px', width:'auto', height:'auto', paddingLeft:'5px', paddingRight:'5px', borderRadius:'50%'}}
      />
      <Typography 
        variant="body2"
        sx={{ backgroundColor:'lightgrey', textAlign:'center', visibility:'hidden'}}
        className='ingredient-icon-name'
      >
        {ingredient.name}
      </Typography>

    </Box>
  )
}
