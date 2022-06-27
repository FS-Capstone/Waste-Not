import React from 'react';
import {Box, Typography, IconButton} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function DevPlate({dev}) {

  return (
    <Box sx={{
      display:'flex', 
      width:'8vw', 
      minWidth:'150px', 
      height:'8vw', 
      minHeight:'150px', 
      justifyContent:'center', 
      alignItems:'center', 
      flexDirection: 'column', 
      padding:'1rem', 
      backgroundImage:'url("/images/Plate.png")', 
      backgroundRepeat:'no-repeat', 
      backgroundPosition:'center', 
      backgroundSize:'contain', 
      margin:'1.5rem', 
      textAlign:'center' }}>
      <Typography variant='h4' color='white'>{dev.name}</Typography>
      <Box sx={{display:'flex'}}>
        <IconButton onClick={()=> window.open(dev.gitHub)}>
          <GitHubIcon style={{color:'white'}}/>
        </IconButton>
        <IconButton onClick={()=> window.open(dev.linkedIn)}>
          <LinkedInIcon style={{color:'white'}}/>
        </IconButton>
      </Box>
    </Box>
  )

}

