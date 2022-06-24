import React, {useEffect, useState, useRef} from 'react';
import { Box, Typography, Slide } from '@mui/material';
import { Link } from 'react-router-dom';

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
        width:'100vh%',
        minHeight:'100vh',
        backgroundImage:'url("/images/wine5.png")',
        backgroundSize: 'cover',
        backgroundAttachment:'fixed',
      }}
      >
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-end'}}>
          <Box ref={slideRef} sx={{display:'flex', justifyContent:'flex-end', width:'50vw', height:'30vh'}}>
            <Slide direction='right' in={checked} container={slideRef.current}>
              <Typography variant='h1' sx={{fontFamily: 'Alex Brush, cursive'}}>Drinking good wine with good food in good company is one of life's most civilized pleasures.</Typography>
            </Slide>
          </Box>
          <Box sx={{width:'50vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'5rem'}}>
            <Typography variant='h2' sx={{fontFamily: 'Alex Brush, cursive'}}>Wine Pairings & Recommendations </Typography>
            <Link to='/wine/recommend-wine'><button> I have a dish, recommend a wine. </button></Link>
            <Link to='/wine/recommend-dish'><button> I have the wine, recommend a dish. </button></Link>
            <Link to='/wine/recommend-brand'><button> Recommend a brand of wine. </button></Link>
          </Box>
        </Box>
 
    </Box>
  )
}


export default Wine;

