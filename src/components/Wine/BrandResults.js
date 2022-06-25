import React, {useState} from 'react';
import BrandDialog from './BrandDialog'

const BrandResults = (props) => {
const { wine, brands } = props 

const [open, setOpen] = useState(false);
const [selectedBrand, setSelectedBrand] = useState("")

const handleClickOpen = (brand) => {
    setOpen(true)
    setSelectedBrand(brand) 
}

const handleOnClose = () => {
    setOpen(false)
}

    return (
        <div className='brand-results'>
            <h3> Brand Recommendations: </h3>
            <hr/>
            <div>
                { brands.map(brand => { 
                    return (
                    <li key={brand.id}> 
                    {brand.title} ({brand.price}) 
                    <button onClick={() => handleClickOpen(brand)}> More Details </button> 
                    <BrandDialog 
                        open={open}
                        onClose={handleOnClose}
                        selectedbrand={selectedBrand}
                    />
                    </li>
                    )
                }) } 
            </div>
        </div>
    )
}

export default BrandResults;
