import React, {useState, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import WineResults from './WineResults';


const DishToWine = () => {

const [food, setFood] = useState("");
const [wines, setWines] = useState([])
const [text, setText] = useState("")
const [suggestion, setSuggestion] = useState([])


const handleInputChange = (e) => {
    setFood(e.target.value)
}

const handleOnClick = async (req, res, next) => {
    const wines = (await axios.get('/api/wine/winePairing', {
        params: {
            food: food,
            maxPrice: '50'
        }
    })).data;
    setSuggestion(wines.productMatches)
    setWines(wines.pairedWines)
    setText(wines.pairingText)
}

    return (
        <div>
            <Box 
            sx={{
                width:'100%',
                minHeight:'100vh',
                //height:'100vh',
                backgroundImage:'url("/images/pexels-grapes5.jpg")',
                backgroundSize: 'cover',
                backgroundAttachment:'fixed',
                backgroundRepeat: 'no-repeat'
              }}
              >
            <div className='wine' id='dishToWine'>
            <h2> Enter A Dish for Wine Pairings </h2>
            <Box sx={{ '& button': { m: 1 }, display: 'flex', flexWrap: 'wrap', opacity: '0.5' }}>
            <TextField 
                id="outlined-basic" 
                label="Ingredient/Dish/Cuisine"
                variant="outlined" 
                sx={{ m: 1, width: '50ch' }}
                food={food}
                onChange={(e) => handleInputChange(e)}
            /> 
            <Button variant="contained" size="small" onClick={handleOnClick}> Show Wines </Button>
            </Box>
            { wines.length ? <WineResults wines={wines} food={food} text={text} suggestion={suggestion} /> : "" }
            <div>
            <a href='#main'> <Button variant="outlined" size="xs">Back</Button> </a>
            </div>
            </div>
            </Box>
        </div>
    )
}


export default DishToWine;