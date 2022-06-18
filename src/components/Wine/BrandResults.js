import React, {useState} from 'react';
import SimpleDialog from './SimpleDialog'

const BrandResults = (props) => {
const { wine, brands } = props 

const [open, setOpen] = useState(false);
const [selectedBrand, setSelectedBrand] = useState("")

const handleClickOpen = (brand) => {
    console.log(brand)
    setOpen(true)
    setSelectedBrand(brand) 
}

const handleOnClose = () => {
    setOpen(false)
}

    return (
        <div>
            <h3> Brand Recommendations for: </h3>
            <div> { wine } </div>
            <hr/>
            <div>
                { brands.map(brand => { 
                    return (
                    <li key={brand.id}> 
                    {brand.title} ({brand.price}) 
                    <button onClick={() => handleClickOpen(brand)}> More Details </button> 
                    <SimpleDialog 
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

/*
Dialog Box:

User clicks on "More Details" / Button on a wine resuls
Dialog Box opens and displays the following:
    - Title again
    - Image? 
    - Price 
    - Description paragraph
    - Link to Purchase 
X Button in top right corner to close dialog box
Option to save wine to user profile?

*/