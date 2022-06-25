import React, {useEffect, useState, useRef} from 'react';
import { Box, Typography, Slide, Fade, Button, Stack } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import WineToBrand from './WineToBrand';
import WineToDish from './WineToDish';
import DishToWine from './DishToWine';


const Wine = () => {

  // need this? 
  const [checked, setChecked] = useState(false)


  useEffect(()=> {
      setTimeout(()=>{
        setChecked(true)
      }, 1000)
  }, [])

  return(
    <div id='main'>
    <Box 
      className='top-level-page'
      sx={{
        width:'100%',
        minHeight:'100vh',
        //height:'100vh',
        backgroundImage:'url("/images/pexels-grapes5.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment:'fixed',
        backgroundRepeat: 'no-repeat'
      }}
      >
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', p: 3}}>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', textAlign: 'center', width:'50vw', height:'15vh', m: 0.5 }}>
              <Typography variant='h4' sx={{fontFamily: 'Quintessential, cursive', mb: '0px'}}> "Drinking good wine with good food in good company is one of life's most civilized pleasures."</Typography> 
          </Box>
          <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
          <Box sx={{width:'50vw', display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', marginTop:'0.2rem'}}>
            <Typography variant='h3' sx={{fontFamily: 'Quintessential, cursive', p: 3}}>Wine Pairings & Recommendations </Typography>
            <Stack spacing={2} sx={{textAlign: 'center'}}>
            <a href='#dishToWine'><Button variant='contained' sx={{opacity: '0.4'}}> I have a dish, recommend a wine. </Button></a>
            <a href='#wineToDish'><Button variant='contained' sx={{opacity: '0.4'}}> I have the wine, recommend a dish. </Button></a>
            <a href='#wineToBrand'><Button variant='contained' sx={{opacity: '0.4'}}> Recommend a brand of wine. </Button></a>
            </Stack>
          </Box>
          </Fade>
        </Box>
    </Box>
    <DishToWine />
    <WineToDish />
    <WineToBrand />
    </div>
  )
}


export default Wine;
