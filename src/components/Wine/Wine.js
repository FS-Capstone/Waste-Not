import React, {useEffect, useState, useRef} from 'react';
import { Box, Typography, Slide, Fade, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';


const Wine = () => {
  const slideRef = useRef();
  const [checked, setChecked] = useState(false)

  useEffect(()=> {
      setTimeout(()=>{
        setChecked(true)
      }, 1000)
  }, [])

  return(
    <Box 
      className='top-level-page'
      sx={{
        width:'100%',
        minHeight:'100vh',
        backgroundImage:'url("/images/pexels-grapes5.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment:'fixed',
        backgroundRepeat: 'no-repeat'
      }}
      >
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', p: 3}}>
          <Box ref={slideRef} sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', textAlign: 'center', width:'50vw', height:'15vh', m: 0.5 }}>
            {/* <Slide direction='right' in={checked} container={slideRef.current}>
              <Typography variant='h3' sx={{fontFamily: 'Quintessential, cursive'}}>"Drinking good wine with good food in good company is one of life's most civilized pleasures."</Typography>
            </Slide> */}
            {/* <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>  */}
              <Typography variant='h4' sx={{fontFamily: 'Quintessential, cursive', mb: '0px'}}> "Drinking good wine with good food in good company is one of life's most civilized pleasures."</Typography> 
            {/* </Fade> */}
          </Box>
          <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
          <Box sx={{width:'50vw', display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', marginTop:'0.2rem'}}>
            <Typography variant='h3' sx={{fontFamily: 'Quintessential, cursive', p: 3}}>Wine Pairings & Recommendations </Typography>
            <Stack spacing={2} sx={{textAlign: 'center'}}>
            <Link to='/wine/recommend-wine'><Button variant='contained' sx={{opacity: '0.4'}}> I have a dish, recommend a wine. </Button></Link>
            <Link to='/wine/recommend-dish'><Button variant='contained' sx={{opacity: '0.4'}}> I have the wine, recommend a dish. </Button></Link>
            <Link to='/wine/recommend-brand'><Button variant='contained' sx={{opacity: '0.4'}}> Recommend a brand of wine. </Button></Link>
            </Stack>
          </Box>
          </Fade>
        </Box>
 
    </Box>
  )
}


export default Wine;

