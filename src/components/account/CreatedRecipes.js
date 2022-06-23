import React from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';


const CreatedRecipes = () => {
    const recipes = useSelector(state => state.auth.recipes || []);
    console.log("all recipes, inside created recipes component", recipes) // all of the recipes on auth obj, saved & created
    
    //if(!recipes[0]?.createdByUser) return null; // need to refactor

    const createdRecipes = recipes.filter(recipe => recipe.createdByUser === true);
    console.log("where are my created recipes?", createdRecipes)
    
    return (
        <div>
            { createdRecipes.map(createdRecipe => {
                return (
                    <li key={createdRecipe.id}> 
                    <div>{createdRecipe.title} </div>
                    <div>{createdRecipe.cuisine}</div>
                    <div>{createdRecipe.cookTime}</div>
                    <div>{createdRecipe.prepTime}</div>
                    <div>{createdRecipe.ingredients}</div>
                    <div>{createdRecipe.instructions}</div>
                    </li>
                )
            })}
        </div>
    )
}


export default CreatedRecipes;

