import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { styled } from '@mui/system';
import { Box } from "@mui/system";
import LandingPageContent from './LandingPageContent';

const LandingBackground = styled('div')({
    height: '90vh',
    minHeight: '100vh',
    color: 'white',
    backgroundImage: 'url("/images/Background12.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
});

const LandingPage = () => {
    return (
        <LandingBackground>
           <CssBaseline />
           <LandingPageContent />
        </LandingBackground>
        )
}

export default LandingPage; 

        // <div className='landing'>
        //     <CssBaseline />
        //     <div><h1> Welcome to our Capstone Project</h1></div>
        //     <div><h2> Mission Statement </h2></div>
        //     <div><h3> Statistics etc. </h3></div>
        //     <Link to='/home'> <button> Enter Site </button> </Link>
        // </div> 