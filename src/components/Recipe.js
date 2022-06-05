import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipes } from "../store/recipes";

const Recipe = () => {
  const initialState = { recipes: [] };
  const [recipes, setRecipes] = useState(initialState);
  const dispatch = useDispatch();
  const userPantry = useSelector((state) => state.pantries);
  const userIngredients = userPantry[0] || null;

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
    <div>
      <div>
        PANTRY ITEMS
        <hr />
        {userIngredients !== null
          ? userIngredients.ingredients.map((value, index) => (
              <div key={index}>
                <input value={value.name} type="checkbox" /> {value.name}
              </div>
            ))
          : ""}
      </div>
      <form onSubmit={getRecipes}>
        <button> Get Recipes </button>
      </form>
    </div>
  );
};

export default Recipe;
