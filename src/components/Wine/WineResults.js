import React from 'react';

const WineResults = (props) => {
    const { inputValue } = props

    return (
        <div>
            <h3> You Selected:</h3>
            { inputValue }
        </div>
    )
}

export default WineResults;