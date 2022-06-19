import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import SinglePantryEdit from "./SinglePantryEdit";
import AddPantry from "./AddPantry";


export default function PantryEditor(){
  const pantries = useSelector(state => state.pantries);



  return(
    <Box sx={{margin: '20px'}}>
      <Typography variant="h5" sx={{textAlign: 'center'}}>Your Pantries</Typography>
      {pantries.map(pantry => {
        return (
          <SinglePantryEdit pantry={pantry} key={pantry.id}/>
        )})}
      <AddPantry/>
    </Box>
  )
}
