import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div id='landing'>
            <div><h1> Welcome to our Capstone Project</h1></div>
            <div><h2> Mission Statement </h2></div>
            <div><h3> Statistics etc. </h3></div>
            <Link to='/home'> <button> Enter Site </button> </Link>
        </div>
    )
}

export default LandingPage; 