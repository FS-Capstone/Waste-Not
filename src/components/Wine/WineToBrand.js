import React, {useState} from 'react';
import axios from 'axios';
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

const [wine, setWine] = useState(""); 
const [maxPrice , setMaxPrice] = useState(0);
const [brands, setBrands] = useState([]);
 

 const handleChange = (e, newWine) => {
     setWine(newWine);
}

const handleInputChange = (e) => {
    setMaxPrice(e.target.value)
}

const handleOnClick = async (req, res, next) => {
    const brands = (await axios.get('/api/wine/recommendedBrands', {
        params: {
            wine: wine,
            maxPrice: maxPrice,
            minRating: '0.8',
            number: '10'
        }
    })).data;
    setBrands(brands.recommendedWines)
}

    return (
        <div> 
            <div className='wine' id="wine-to-brand">
                <h2>Select Wine Type for Brand Recommendation </h2>
                <Box sx={{ '& button': { m: 1 }, display: 'flex', flexWrap: 'wrap' }}>
                <Autocomplete
                    wine={wine}
                    onChange={(e, newWine) => handleChange(e, newWine)}
                    disablePortal
                    id="wine-options"
                    options={options}
                    sx={{ m: 1, width: '50ch' }}
                    renderInput={(params) => <TextField {...params} label="-Select Wine-" />}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Maximum Price" 
                    variant="outlined" 
                    sx={{ m: 1, width: '50ch' }}
                    maxprice={maxPrice}
                    onChange={(e) => handleInputChange(e)} 
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <Button variant="contained" size="small" onClick={handleOnClick}>Show Brands</Button>
                </Box>
                { brands.length ? <BrandResults brands={brands} wine={wine} /> : 'No Results Found' }
                <div>
                    <Link to='/wine'> <button> Back </button> </Link>
                </div>
            </div>
        </div>
    )
}
export default WineToBrand;
