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
import { me, getPantries, loadIngredients, fetchRecipes } from "./store";
import { useDispatch, useSelector } from "react-redux";
import AccountPage from "./components/account/AccountPage";

const ClientRoutes = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
    dispatch(loadIngredients());
    console.log('ME and loadIngredients')
  }, []);

  //update pantries every time auth changes
  useEffect(() => {
    dispatch(getPantries());
    console.log('AUTH')
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
        <Route path="pantry" element={<Pantry />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="searchResults" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default ClientRoutes;
