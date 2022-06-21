import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RecipeCard from '../RecipeResults/RecipeCard';
import { SavedRecipeCard } from './SavedRecipeCard';

export default function SavedRecipes() {
  let recipes = useSelector(state => state.auth.recipes || []);
  const availableIngredientIds = useSelector(state => state.selectedPantry.ingredients?.map(ingredient => ingredient.id))


  if(!recipes[0]?.recipeId || !availableIngredientIds)
    return null;

  return(
    <div>
      {recipes.map(recipe => {
        return <SavedRecipeCard key={recipe.id} recipeId={recipe.recipeId}/>
      })}
    </div>
  )
}