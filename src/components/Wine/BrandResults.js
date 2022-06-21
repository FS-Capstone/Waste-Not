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
        <div>
            <h3> Brand Recommendations for: </h3>
            <div> {wine} </div>
            <hr/>
            <div>
                { brands.map(brand => { 
                    return (
                    <li key={brand.id}> 
                    {brand.title} ({brand.price}) 
                    <button onClick={() => handleClickOpen(brand)}> More Details </button> <button> Save </button>
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
