import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import { editPantryName } from "../../store/pantry";
import SinglePantryEdit from "./SinglePantryEdit";
import AddPantry from "./AddPantry";

export default function PantryEditor(){
  const pantries = useSelector(state => state.pantries);



  return(
    <div>
      <Typography variant="h3">Pantries</Typography>
      {pantries.map(pantry => {
        return (
          <SinglePantryEdit pantry={pantry} key={pantry.id}/>
        )})}
      <AddPantry/>
    </div>
  )
}
