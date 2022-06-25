import React from 'react';

const WineResults = (props) => {
    const { wines, food, text, suggestion } = props

    return (
        <div className='wine-results'>
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
            <div> <h3> We Suggest: </h3></div>
            { suggestion.map(suggestion => {
                return (
                    <div key={suggestion.id}>
                        <div>{suggestion.title} - <a href={suggestion.link}> {suggestion.price} </a></div>
                        <div>{suggestion.description}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default WineResults;