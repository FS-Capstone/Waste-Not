/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
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
import SearchResults from "./components/RecipeResults/SearchResults";
import { me, getPantries, loadIngredients, loadShoppingList } from "./store";
import { useDispatch, useSelector } from "react-redux";
import AccountPage from "./components/account/AccountPage";
import CreateRecipe from "./components/CreateRecipe";
import ShoppingList from "./components/account/ShoppingList";
import SidePantry from "./components/pantry/SidePantry";


const ClientRoutes = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
    dispatch(loadIngredients());
  }, []);

  //update pantries every time auth changes
  useEffect(() => {
    dispatch(getPantries());
    dispatch(loadShoppingList(auth.id))
  }, [auth]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="wine" element={<Wine />} />
        <Route path="wine/recommend-wine" element={<DishToWine />} />
        <Route path="wine/recommend-dish" element={<WineToDish />} />
        <Route path="wine/recommend-brand" element={<WineToBrand />} />
        <Route path="pantry" element={<SidePantry />} />
        <Route path="recipe/:id" element={<Recipe />} />
        <Route path="account" element={<AccountPage />} />
        <Route path='/shoppingList' element={<ShoppingList/>} />
        <Route path="searchResults" element={<SearchResults />} />
        <Route path="create-recipe" element={<CreateRecipe />} />
      </Routes>
    </>
  );
};

export default ClientRoutes;
