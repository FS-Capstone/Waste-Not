import React from "react";
import { Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deletePantryItem } from "../../store/pantry";

export default function PantryIcon({ingredient}){
  const dispatch = useDispatch();
  const selectedPantry = useSelector(state => state.selectedPantry);
  
  return(
    <Box sx={{display:'inline'}}>
      <Avatar sx={{height:'60px', width:'60px', boxShadow:'5px 5px 5px black', display:'flex'}}>
        <img 
          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
          alt='' 
          style={{maxHeight:'75px', maxWidth:'75px', width:'auto', height:'auto'}}
        />
      </Avatar>
      <IconButton 
        sx={{position:'relative', left:'35px', top:'-70px'}}
        size='small'
        color="secondary"
        onClick={() => dispatch(deletePantryItem(ingredient.id, selectedPantry.id))}
      >
        <DeleteIcon/>
      </IconButton>
    </Box>
  )
}