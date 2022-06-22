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
        h1: {
           fontSize: '3rem',
           margin: '0' 
        },
        h2: {
            fontSize: '2rem'
        }
})

const LandingPageContent = () => {
    return (
        <LandingContent>
            <Collapse>
            <h1> Welcome to our Capstone Project</h1>
            <h2> (Tagline) </h2>
            <div><Link to='/home'> <button> Enter Site </button> </Link></div>
            </Collapse>
        </LandingContent>
    )
}

export default LandingPageContent;