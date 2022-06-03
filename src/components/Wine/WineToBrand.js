import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const WineToBrand = () => {
    return (
        <div>
            <Navbar /> 
            <div className='wine'>
            <h2>Select Wine Type for Brand Recommendation </h2>
            <form>
                <div><input placeholder='Enter Wine' name='wine'/></div>
                <button> Show Brands </button>
            </form>
            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}

export default WineToBrand;