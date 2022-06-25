import React, {useState} from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledFooter = styled(AppBar)(({theme}) => ({
  position:'fixed',
  color:'primary',
  borderRadius:'5px 5px 0 0',
  top:'auto',
  bottom:'0',
  width:'100vw',
  height:'20px',
  transition: 'height 500ms ease-in-out',
  '&:hover':{
    height:'50px',
    transition: 'height 500ms ease-in-out',
  }
}))


export default function Footer() {
  const [open, setOpen] = useState(false)

  return(
    <StyledFooter onMouseEnter={() => setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <Box sx={{display:'flex', height:'100%', visibility: !open ? 'hidden' : 'visible', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <Typography sx={{fontSize:'1.5 rem', fontFamily:'Nunito'}}>Copyright &copy; Waste Not 2022</Typography>
      </Box>
    </StyledFooter>
  )
};