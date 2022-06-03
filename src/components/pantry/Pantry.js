import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Pantry() {
  return(
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={['example', 'ingredient', 'options']}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Ingredients" />}
    />
  )
}