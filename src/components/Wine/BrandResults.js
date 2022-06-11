import React from 'react';


const BrandResults = (props) => {
const { wine } = props 


return (
    <div>
        <h3> You Selected: </h3>
        <hr/>
        <div> { wine } </div>
        <div>
            {/* { results.map(result => { 
                return (
                <li> {result.title} </li>
                )
            }) } */}
        </div>
    </div>
)
}

export default BrandResults;