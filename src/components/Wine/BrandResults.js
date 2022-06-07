import React from 'react';

const BrandResults = (props) => {
const { value } = props

return (
    <div>
        <h3> You Selected: </h3>
        { value }
    </div>
)

}

export default BrandResults;