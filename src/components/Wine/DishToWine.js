import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
//import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment } from '@mui/material';
//import WineResults from './WineResults';


 // (not finished, need to fix the button functionality) 

const DishToWine = () => {

const [inputValue, setInputValue] = useState("")
//const [isSelected, setIsSelected] = useState(false)

const handleChange = (e, inputValue ) => {
    console.log(inputValue);
    setInputValue(inputValue);
}

    return (
        <div>
            <div className='wine'>
            <h2> Input Dish for Wine Recommendation </h2>
            <Box sx={{ '& button': { m: 1 }, display: 'flex', flexWrap: 'wrap' }}>
            <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    sx={{ m: 1, width: '50ch' }}
                    onChange={(e, inputValue) => handleChange(e, inputValue)}
                    inputvalue={inputValue}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"> Dish / Cuisine </InputAdornment>,
                    }}
            /> 
            <Button variant="contained" size="small" >Show Wines</Button>
            </Box>
            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}

// { isSelected === true ? <WineResults inputValue={inputValue} /> : null }
// onClick={ () => inputValue === null ? "" : setIsSelected(true) }

export default DishToWine;