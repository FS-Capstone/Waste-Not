import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import WineResults from './WineResults';


const DishToWine = () => {

const [food, setFood] = useState("");
const [wines, setWines] = useState([])
const [text, setText] = useState("")

const handleInputChange = (e) => {
    console.log(e.target.value);
    setFood(e.target.value)
}

const handleOnClick = async (req, res, next) => {
    const wines = (await axios.get('/api/wine/winePairing', {
        params: {
            food: food,
            maxPrice: '50'
        }
    })).data;
    console.log(wines)
    console.log(wines.pairedWines)
    setWines(wines.pairedWines)
    setText(wines.pairingText)
}

    return (
        <div>
            <div className='wine'>
            <h2> Enter A Dish for Wine Pairings </h2>
            <Box sx={{ '& button': { m: 1 }, display: 'flex', flexWrap: 'wrap' }}>
            <TextField 
                id="outlined-basic" 
                label="Ingredient/Dish/Cuisine"
                variant="outlined" 
                sx={{ m: 1, width: '50ch' }}
                food={food}
                onChange={(e) => handleInputChange(e)}
                // InputProps={{
                //     startAdornment: <InputAdornment position="start"> Ingredient/Dish/Cuisine </InputAdornment>,
                // }}
            /> 
            <Button variant="contained" size="small" onClick={handleOnClick}> Show Wines </Button>
            </Box>
            { wines.length ? <WineResults wines={wines} food={food} text={text} /> : "No Wine Pairings Found"}
            <div>
                <Link to='/wine'> <button>Back</button> </Link>
            </div>
            </div>
        </div>
    )
}


export default DishToWine;