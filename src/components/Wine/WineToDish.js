import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


const WineToDish = () => {
    return (
        <div> 
            <Navbar />
            <div className='wine'>
            <h2> Input Wine for Dish Recommendation </h2>
            <form>
                <div><input placeholder='Enter Wine' name='wine'/></div>
                <button> Show Food Matches </button>
            </form>
            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}

export default WineToDish;