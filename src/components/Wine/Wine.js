import React from 'react';
import { CssBaseline } from "@mui/material";
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const WineBackground = styled('div')({
    height: '100vh',
    minHeight: '100%',
    minWidth: '100%',
    color: 'white',
    backgroundImage: 'url("/images/winebackground2.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
})

const Wine = () => {
  return(
    <WineBackground>
    {/* <div>
      <div className='wine'>
      <h1>Wine Pairings & Recommendations </h1>
      <Link to='/wine/recommend-wine'><button> I have a dish, recommend a wine. </button></Link>
      <Link to='/wine/recommend-dish'><button> I have the wine, recommend a dish. </button></Link>
      <Link to='/wine/recommend-brand'><button> Recommend a brand of wine. </button></Link>
      </div>
    </div> */}
    </WineBackground>
  )
}


export default Wine;

