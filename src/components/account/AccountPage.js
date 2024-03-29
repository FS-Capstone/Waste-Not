import React, { useState, useEffect } from "react";
import PantryEditor from "./PantryEditor";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import EditIcon from '@mui/icons-material/Edit';
import PasswordChange from "./PasswordChange";
import UsernameEdit from './UsernameEdit';
import PantrySelector from '../pantry/PantrySelector'

const AccountPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const username = useSelector(state => state.auth.username)
  const theme = useTheme();
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return(
    <Box 
      sx={{
        display:'flex', 
        justifyContent:'center',
        backgroundImage: 'url("images/Utensils2.jpg")',
        backgroundSize: "contain",
        backgroundAttachment: "fixed",
        minHeight:'100vh',
        }} 
        className='top-level-page'>
      <PasswordChange open={openDialog} handleClose={() => setOpenDialog(false)}/>
      <Paper sx={{
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center', 
        width:'80vw', 
        padding:0, 
        overflow:'hidden', 
        height:'fit-content',
        opacity:.95
        }}>

        <Box backgroundColor={theme.palette.primary.light} sx={{width:'100%', display:'flex', justifyContent:'center'}}>
          <UsernameEdit username={username}/>
        </Box>
        <Box sx={{display:'flex'}}>
          <Typography variant="h6">Password: •••••••••••••</Typography>
          <IconButton onClick={() => setOpenDialog(true)}>
            <EditIcon fontSize='small'/>
          </IconButton>
        </Box>
        <PantryEditor/>
        <Typography variant="h6">Select Pantry</Typography>
        <PantrySelector/>
      </Paper>
    </Box>

  )
}

export default AccountPage;