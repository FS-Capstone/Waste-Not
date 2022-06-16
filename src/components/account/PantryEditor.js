import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
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
