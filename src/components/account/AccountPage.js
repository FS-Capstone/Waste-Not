import { Box, Select } from "@mui/material";
import React from "react";
import { useState } from "react";


const AccountPage = () => {
  const [selectedPantry, setSelectedPantry] = useState({})

  return(
    <Box>
      <h1>Account Page</h1>
      <Select
        labelId="selected-pantry"
        id="selected-pantry"
        value={selectedPantry}
        label="Age"
        onChange={(evt) => setSelectedPantry(evt.target.value)}
        >
          
      </Select>
    </Box>
  )
}

export default AccountPage;