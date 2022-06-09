import React from 'react';

const DishResults = (props) => {
    const { value } = props

    return (
        <div>
            <h3> You Selected:</h3>
            { value }
        </div>
    )
}

export default DishResults;