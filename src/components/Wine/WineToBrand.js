import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const WineToBrand = () => {
    return (
        <div>
            <Navbar /> 
            <div className='wine'>
            <h2>Input Wine Type for Brand Recommendation </h2>
            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}

export default WineToBrand;