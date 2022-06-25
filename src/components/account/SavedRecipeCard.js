import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../RecipeResults/RecipeCard";

export function SavedRecipeCard({ recipeId }){
  let [recipeInfo, setRecipeInfo] = useState({})

  useEffect(() => {
    const getInfo = async() =>{
      const info = (await axios.get(`/api/search/detailsByRecipeId/${recipeId}`)).data;
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