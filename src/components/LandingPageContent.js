import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { styled } from '@mui/system';

const LandingContent = styled('div')({
    color: 'white',
    display: 'flex',
    height: '90vh',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Nunito',
})

const LandingPageContent = () => {
    return (
        <LandingContent>
            <div><h1> Welcome to our Capstone Project</h1></div>
             <div><h2> Mission Statement </h2></div>
             <div><h3> Statistics etc. </h3></div>
             <Link to='/home'> <button> Enter Site </button> </Link>
        </LandingContent>
    )
}

export default LandingPageContent