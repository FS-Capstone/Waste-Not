import React from "react";
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { deletePantryItem } from "../../store";
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

export const PantryItem = ({ingredient}) => {
  const dispatch = useDispatch();
  const selectedPantryId = useSelector(state => state.selectedPantry.id)

  const handleDelete = (ingredientId) => {
    dispatch(deletePantryItem(ingredientId, selectedPantryId));
  }

  return(
    <ListItem sx={{display: "flex", justifyContent:"space-between"}}>
      <Checkbox size='small'/>
      <Typography variant="body1" sx={{paddingLeft:'25px'}}>{ingredient.name}</Typography>
      <IconButton color="secondary" onClick={() => handleDelete(ingredient.id)} >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}