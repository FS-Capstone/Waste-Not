import React from 'react';

const DishResults = (props) => {
    const { wine, dishes, text } = props

    return (
        <div>
            <h3> Dish Pairings for: </h3>
            <div> { wine }  </div>
            <div> {text} </div>
            <hr/>
            <div>
                { dishes.map((dish, index) => { 
                    return (
                    <li key={index}> {dish} </li>
                    )
                }) }
            </div>
        </div>
    )
}

export default DishResults;