import React from 'react';
import { Box, Typography } from '@mui/material';
import DevPlate from './DevPlate';



export default function AboutPage() {

  const devs = [
    {
      name: 'Scott Johnson',
      gitHub: 'https://github.com/GingerVitas',
      linkedIn: 'https://www.linkedin.com/in/scottjohnsondev/'
    },
    {
      name: 'Jennifer Woodbury',
      gitHub: 'https://github.com/JWoodbury125',
      linkedIn: 'https://www.linkedin.com/in/jennifer-woodbury-0290814/'
    },
    {
      name: 'Zachary Rizzo',
      gitHub: 'https://github.com/Ztrizzo',
      linkedIn: 'https://www.linkedin.com/in/zacharyrizzo/'
    },
    {
      name: 'Janae Edwards',
      gitHub: 'https://github.com/JanaeHijaz',
      linkedIn: 'https://www.linkedin.com/in/janaehijazedwards/'
    }
  ]

  return (
    <Box 
    sx={{
      display:'flex', 
      flexDirection:'row-reverse',
      width:'100vh%', 
      height:'100%', 
      minHeight:'100vh', 
      backgroundImage:'url("/images/AboutBackground.png")', 
      backgroundSize:'cover', 
      backgroundRepeat:'no-repeat', 
      backgroundAttachment:'fixed'}}>
      <Box sx={{display:'flex', flexDirection:'column', paddingTop:'8vh', alignItems:'center', }}>
        <Typography variant='h2' color='white' sx={{fontFamily:'Nunito'}}>Developed By</Typography>
        <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
            {devs.map(dev => <DevPlate key={dev.name} dev={dev} /> )}
        </Box>
        <Box sx={{display:'flex', flexDirection:'column',  alignItems:'center'}}>
          <Typography variant='h4' color='white' sx={{fontFamily:'Nunito'}}>Serving Up:</Typography>
          <Box component='img' src='/images/Techstack.png' sx={{maxWidth:'80%', maxHeight:'55vh',  marginTop:'1rem', overflow:'scroll'}} />
        </Box>
      </Box>
      <Box sx={{width:'800px', visibility:'hidden'}}>Test Content</Box>
    </Box>
    
  )
}