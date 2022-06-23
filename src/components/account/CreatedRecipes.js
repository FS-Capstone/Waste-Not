import React from 'react';
import { useSelector } from 'react-redux';

const CreatedRecipes = () => {
    const recipes = useSelector(state => state.auth.recipes || []);
    console.log(recipes) // all of the recipes on auth obj, saved & created
    
    if(!recipes[0]?.createdByUser) return null; // need to refactor

    const createdRecipes = recipes.filter(recipe => recipe.createdByUser === true);
    
    return (
        <div>
            { createdRecipes.map(createdRecipe => {
                return (
                    <div key={createdRecipe.id}> {createdRecipe.title} </div>
                )
            })}
        </div>
    )
}


export default CreatedRecipes;

/*

- since created recipes are now saved on the recipe model, 
    we need to get them from the redux store => useSelector
- we need to get all of the recipes where createdByUser = true. 
- if there are none, return null (or something else)
- if there are created recipes, map over them and render them

( need to remove all the console logs before PR)
*/