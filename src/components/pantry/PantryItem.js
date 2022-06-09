import React from "react";
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { deletePantryItem } from "../../store";

export const PantryItem = ({ingredient}) => {
  const dispatch = useDispatch();
  const selectedPantryId = useSelector(state => state.selectedPantry.id)

  const handleDelete = (ingredientId) => {
    dispatch(deletePantryItem(ingredientId, selectedPantryId));
  }

  return(
    <ListItem sx={{display: "flex", justifyContent:"space-between"}}>
      {ingredient.name}
      <IconButton color="secondary" onClick={() => handleDelete(ingredient.id)} >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}