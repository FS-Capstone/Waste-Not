import React from 'react';


const BrandResults = (props) => {
const { wine, brands } = props 

    return (
        <div>
            <h3> Brand Recommendations for: </h3>
            <div> { wine } </div>
            <hr/>
            <div>
                { brands.map(brand => { 
                    return (
                    <li key={brand.id}> {brand.title} ({brand.price}) </li>
                    )
                }) } 
            </div>
        </div>
    )
}

export default BrandResults;