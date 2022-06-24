/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Home from "./components/Home";
import Wine from "./components/Wine/Wine";
import WineToBrand from "./components/Wine/WineToBrand";
import WineToDish from "./components/Wine/WineToDish";
import DishToWine from "./components/Wine/DishToWine";
import Pantry from "./components/pantry/Pantry";
import { Login, Signup } from "./components/AuthForm";
import Recipe from "./components/Recipe";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import RecipeSearch from "./components/RecipeResults/RecipeSearch";
import { me, getPantries, loadIngredients, loadShoppingList } from "./store";
import { useDispatch, useSelector } from "react-redux";
import AccountPage from "./components/account/AccountPage";
import CreateRecipe from "./components/CreateRecipe";
import ShoppingList from "./components/account/ShoppingList";
import SavedRecipes from "./components/account/SavedRecipes";
import CreatedRecipes from "./components/account/CreatedRecipes";

const ClientRoutes = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
    dispatch(loadIngredients());
  }, []);

  //update pantries every time auth changes
  useEffect(() => {
    dispatch(loadShoppingList(auth.id));
    dispatch(getPantries());
  }, [auth]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="wine" element={<Wine />} />
        <Route path="wine/recommend-wine" element={<DishToWine />} />
        <Route path="wine/recommend-dish" element={<WineToDish />} />
        <Route path="wine/recommend-brand" element={<WineToBrand />} />
        <Route path="pantry" element={<Pantry />} />
        <Route path="recipe/:id" element={<Recipe />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="searchResults" element={<RecipeSearch />} />
        <Route path="create-recipe" element={<CreateRecipe />} />
        <Route path="savedRecipes" element={<SavedRecipes />} />
        <Route path="createdRecipes" element={<CreatedRecipes />} />
      </Routes>
    </>
  );
};

export default ClientRoutes;
