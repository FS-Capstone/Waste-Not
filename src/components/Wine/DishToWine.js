import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
//import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment } from '@mui/material';
import WineResults from './WineResults';


const DishToWine = () => {

const [inputValue, setInputValue] = useState("")

const handleChange = (e, inputValue) => {
    console.log(inputValue);
    setInputValue(inputValue);
}

const handleOnClick = async (req, res, next) => {
    console.log("In the on click!")
    console.log(inputValue)
}

    return (
        <div>
            <div className='wine'>
            <h2> Enter A Dish for Wine Pairings </h2>
            <Box sx={{ '& button': { m: 1 }, display: 'flex', flexWrap: 'wrap' }}>
            <TextField 
                id="outlined-basic" 
                variant="outlined" 
                sx={{ m: 1, width: '50ch' }}
                onChange={(e, newInputValue) => handleChange(e, newInputValue)}
                inputvalue={inputValue}
                InputProps={{
                    startAdornment: <InputAdornment position="start"> Ingredient/Dish/Cuisine </InputAdornment>,
                }}
            /> 
            <Button variant="contained" size="small" onClick={handleOnClick}> Show Wines </Button>
            </Box>

            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}


export default DishToWine;