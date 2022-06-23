import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RecipeCard from '../RecipeResults/RecipeCard';
import { SavedRecipeCard } from './SavedRecipeCard';

export default function SavedRecipes() {
  let recipes = useSelector(state => state.auth.recipes || []);
  const availableIngredientIds = useSelector(state => state.selectedPantry.ingredients?.map(ingredient => ingredient.id))

 // need to fix line 17-18 because recipe[0] might be createdByUser (therefore no recipeId),
 // even if there are other recipes ([1], etc) that DO have recipeIds.
//  console.log("from saved recipes component", recipes)
//  const savedRecipes = recipes.filter(recipe => recipe.createdByUser === false);
//  console.log("where are my saved recipes?", savedRecipes)

  if(!recipes[0]?.recipeId || !availableIngredientIds)
    return null;

  return(
    <div className='top-level-page'>
      {recipes.map(recipe => {
        return <SavedRecipeCard key={recipe.id} recipeId={recipe.recipeId}/>
      })}
    </div>
  )
}