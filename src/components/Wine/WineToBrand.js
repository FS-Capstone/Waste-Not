import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//import {TextField, Autocomplete} from '@mui/icons-material'
//import { options } from './options'
//const options = require('./options');
 const options = [
        'Select Wine',
        'white_wine', // category
        'dry_white_wine', // sub-category
        'assyrtiko',
        'pinot_blanc',
        'cortese',
        'roussanne',
        'moschofilero',
        'muscadet',
        'viognier',
        'verdicchio',
        'greco',
        'marsanne',
        'white_burgundy',
        'chardonnay',
        'gruener_veltliner',
        'white_rioja',
        'frascati',
        'gavi',
        'l_acadie_blanc',
        'trebbiano',
        'sauvignon_blanc',
        'catarratto',
        'albarino',
        'arneis',
        'verdejo',
        'vermentino',
        'soave',
        'pinot_grigio',
        'dry_riesling',
        'torrontes',
        'mueller_thurgau',
        'grechetto',
        'gewurztraminer',
        'chenin_blanc',
        'white_bordeaux',
        'semillon',
        'riesling',
        'sauternes',
        'sylvaner',
        'lillet_blanc',
        'red_wine', // category
        'dry_red_wine', // sub-category
        'petite_sirah',
        'zweigelt',
        'baco_noir',
        'bonarda',
        'cabernet_franc',
        'bairrada',
        'barbera_wine',
        'primitivo',
        'pinot_noir',
        'nebbiolo',
        'dolcetto',
        'tannat',
        'negroamaro',
        'red_burgundy',
        'corvina',
        'rioja',
        'cotes_du_rhone',
        'grenache',
        'malbec',
        'zinfandel',
        'sangiovese',
        'carignan',
        'carmenere',
        'cesanese',
        'cabernet_sauvignon',
        'aglianico',
        'tempranillo',
        'shiraz',
        'mourvedre',
        'merlot',
        'nero_d_avola',
        'bordeaux',
        'marsala',
        'port',
        'gamay',
        'dornfelder',
        'concord_wine',
        'sparkling_red_wine',
        'pinotage',
        'agiorgitiko',
        'dessert_wine', // category
        'pedro_ximenez',
        'moscato',
        'late_harvest',
        'ice_wine',
        'white_port',
        'lambrusco_dolce',
        'madeira',
        'banyuls',
        'vin_santo',
        'rose_wine', // category
        'sparkling_rose',
        'sparkling_wine', // category
        'cava',
        'cremant',
        'champagne',
        'prosecco',
        'spumante',
        'sherry', // category
        'cream_sherry',
        'dry_sherry',
        'vermouth', // category
        'dry_vermouth',
        'fruit_wine', // category
        'mead' // category
    ]

const WineToBrand = () => {

const [value, setValue] = useState(options[0]) // need to fix the initial state
   
    return (
        <div> 
            <div className='wine'>
                <h2>Select Wine Type for Brand Recommendation </h2>
                <Autocomplete
                value={value}
                onChange={(event, value) => { 
                    console.log(value); 
                    setValue(value)
                }}
                disablePortal
                id="wine-options"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Wine" />}
                /> 
                <button> Show Brands </button>
                <div>
                    <Link to='/wine'> <button>Back</button> </Link>
                </div>
            </div>
        </div>
    )
}
export default WineToBrand;


/*
3. Wine Recommendation API: input is a type of wine and the response is a specific brand of that wine type. 
   done. - need to create an input field for the wine type (string) (or drop down selector for entire list from Wine Guide?)
  - need additional input fields for additional (optional) parameters as needed (maxPrice, minRating, number)
  - need to store that string as a variable somewhere (or req.body.query)
  - need to do API call with that input string as the query parameter: https://api.spoonacular.com/food/wine/recommendation?wine=${req.body.query}&number=100 (always 100 (max number) to get all results)
  - api call is in the wine api routes folder
  -called in redux store wine reducer
*/
