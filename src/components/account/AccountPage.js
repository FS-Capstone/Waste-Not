import React, { useState } from "react";
import PantryEditor from "./PantryEditor";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import EditIcon from '@mui/icons-material/Edit';
import PasswordChange from "./PasswordChange";
import UsernameEdit from './UsernameEdit';

const AccountPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const username = useSelector(state => state.auth.username)
  const theme = useTheme();
  
  

  return(
    <Box sx={{display:'flex', justifyContent:'center', margin:'20px'}}>
      <PasswordChange open={openDialog} handleClose={() => setOpenDialog(false)}/>
      <Paper sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'fit-content', padding:0, overflow:'hidden'}}>
        <Box backgroundColor={theme.palette.primary.light} sx={{width:'100%', display:'flex', justifyContent:'center'}}>
          <UsernameEdit username={username}/>
          
        </Box>
        <Box sx={{display:'flex', margin:'20px'}}>
          <Typography variant="h6">Password: •••••••••••••</Typography>
          <IconButton onClick={() => setOpenDialog(true)}>
            <EditIcon fontSize='small'/>
          </IconButton>
        </Box>
        <PantryEditor/>
      </Paper>
    </Box>

  )
}

export default AccountPage;