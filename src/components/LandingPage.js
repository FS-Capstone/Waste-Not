import React from "react";
import { CssBaseline } from "@mui/material";
import { styled } from '@mui/system';
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

    