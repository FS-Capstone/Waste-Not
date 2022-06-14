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
    <Box  className='pantry-icon' sx={{maxHeight:'75px', width:'auto', position:'relative', marginLeft:'10px', marginRight:'10px'}}>
      {/* <div className="ingredient-icon" style={{justifySelf:'center', alignSelf:'center'}}> */}
        {/* <div className="ingredient-icon-wrapper" style={{borderRadius:'50%'}}> */}
          <img 
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
            alt='' 
            style={{maxHeight:'75px', maxWidth:'75px', width:'auto', height:'auto', paddingLeft:'5px', paddingRight:'5px', borderRadius:'50%'}}
          />
        {/* </div> */}
      {/* </div> */}
      <IconButton 
        sx={{position:'absolute', right:'-2px', top:'-3px', padding:0}}
        size='small'
        color="secondary"
        onClick={() => dispatch(deletePantryItem(ingredient.id, selectedPantry.id))}
      >
        <DeleteIcon/>
      </IconButton>
    </Box>
  )
}