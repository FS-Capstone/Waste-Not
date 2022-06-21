import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import RecipeCard from "../RecipeResults/RecipeCard";

export function SavedRecipeCard({ recipeId }){
  let [recipeInfo, setRecipeInfo] = useState({})
  const availableIngredientIds = useSelector(state => state.selectedPantry.ingredients?.map(ingredient => ingredient.id))



  useEffect(() => {
    const getInfo = async() =>{
      if(!availableIngredientIds)
        return;
      const info = (await axios.get(`/api/search/detailsByRecipeId/${recipeId}`)).data;
      
      
      //We have to manually add missedIngredientCount property to object because it gets used
      //in the card component
      info.missedIngredientCount = info.extendedIngredients.reduce((numMissed, ingredient) => {
        if(availableIngredientIds.includes(ingredient.id))
          return numMissed;
        return numMissed + 1;
       }, 0)

      setRecipeInfo(info)

    }
    getInfo();
  }, []);

  if(!recipeInfo.id)
    return null;
  return(
    <div>
      <RecipeCard recipe={recipeInfo}/>
    </div>
  )
}