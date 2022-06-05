import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipes } from "../store/recipes";

const Recipe = () => {
  const initialState = { recipes: [] };
  const [recipes, setRecipes] = useState(initialState);
  const dispatch = useDispatch();
  const userPantry = useSelector((state) => state.pantries);
  const userIngredients = userPantry[0];

  if (userIngredients) {
    const ingredientsArr = userIngredients.ingredients.map(
      (value) => value.name
    );
    dispatch(addRecipes(ingredientsArr));
  }
  const getRecipes = (event) => {
    event.persist();
    setRecipes((values) => ({
      ...values,
      recipes: event.target.value,
    }));
  };

  return (
    <form onSubmit={getRecipes}>
      <button> Get Recipes </button>
    </form>
  );
};

export default Recipe;
