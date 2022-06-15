import React from 'react';

const WineResults = (props) => {
    const { wines, food, text } = props

    return (
        <div>
            <h3> Pair {food} With :</h3>
            <hr/>
            <div>
                { wines.map((wine, index) => {
                    return (
                        <li key={index}> {wine} </li>
                    )
                })}
            </div>
            <div> {text} </div>
        </div>
    )
}

export default WineResults;