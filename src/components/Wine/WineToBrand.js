import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment } from '@mui/material';
import BrandResults from './BrandResults';

 const options = [
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

const [value, setValue] = useState(null) // need to fix the initial state?
const [isSelected, setIsSelected] = useState(false)

 const [maxprice , setMaxprice] = useState(0) // add these for typed input values

 const handleChange = (e, newValue) => {
//     //e.preventDefault();
     console.log(newValue)
     setValue(newValue)   
}

    return (
        <div> 
            <div className='wine'>
                <h2>Select Wine Type for Brand Recommendation </h2>
                <Box sx={{ '& button': { m: 1 }, display: 'flex', flexWrap: 'wrap' }}>
                
                <Autocomplete
                    value={value}
                    onChange={(e, newValue) => handleChange(e, newValue)}
                    disablePortal
                    id="wine-options"
                    options={options}
                    //sx={{ width: 300 }}
                    sx={{ m: 1, width: '50ch' }}
                    //getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} label="-Select Wine-" />}
                /> 

                <TextField 
                    id="outlined-basic" 
                    label="Maximum Price" 
                    variant="outlined" 
                    sx={{ m: 1, width: '50ch' }}
                    maxprice={maxprice}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                /> 

                <Button variant="contained" size="small" onClick={ () => value === null ? "" : setIsSelected(true) }>Show Brands</Button>
                </Box>
                { isSelected === true ? <BrandResults value={value} /> : null }
                <div>
                    <Link to='/wine'> Back </Link>
                </div>
            </div>
        </div>
    )
}
export default WineToBrand;


/*
3. Wine Recommendation API: input is a type of wine and the response is a specific brand of that wine type. 
   done. - need to create an input field for the wine type (string) (or drop down selector for entire list from Wine Guide?)
   done. - need additional input fields for additional (optional) parameters as needed (maxPrice, minRating, number)
  - need to store that string as a variable somewhere (or req.body.query)
  - need to do API call with that input string as the query parameter: https://api.spoonacular.com/food/wine/recommendation?wine=${req.body.query}&number=100 (always 100 (max number) to get all results)
  - api call is in the wine api routes folder
  -called in redux store wine reducer


  UPDATED:
  - don't need redux store since not saving or updating the database in any way with these results.
  - now that the wine value is being console.logged on the button click, what we want is: 
    - create another component called <Brand Results />. if there is a value, have the onClick render that component, otherwise don't. 
    - pass value into Brand Results as props
    - in the Brand Results component, create a function that makes the api call with template literal for the value as query 
    - render the api call results 
  - style later
    
  */
