import { FormControl, Select } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MenuItem } from "@mui/material";
import { changeSelectedPantry } from "../../store";

export default function PantrySelector() {
  
  const usersPantries = useSelector(state => state.pantries);
  const selectedPantry = useSelector(state => usersPantries.find(pantry => state.auth.currentlySelectedPantryId === pantry.id));

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeSelectedPantry(
      usersPantries.find(pantry => pantry.name === evt.target.value).id
    ));
  }

  if(!selectedPantry)
    return null;

  return(
    <FormControl fullWidth>
      <Select
        labelId="selected-pantry"
        id="selected-pantry"
        value={selectedPantry.name}
        label="Pantry"
        onChange={handleChange}
        >
          {usersPantries.map(pantry => {
            return <MenuItem key={pantry.id} value={pantry.name}>{pantry.name}</MenuItem>
          })}
      </Select>
    </FormControl>
  )
}