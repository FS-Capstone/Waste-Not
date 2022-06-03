import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const DishToWine = () => {
    return (
        <div> 
            <Navbar/>
            <div className='wine'>
            <h2> Select Dish for Wine Recommendation </h2>
            <form>
                <div><input placeholder='Enter Dish' name='dish'/></div>
                <button> Show Wine Matches </button>
            </form>
            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}

export default DishToWine;