import React from 'react';
import Home from './components/Home';
import Pantry from './components/Pantry';
import Wine from './components/Wine/Wine';
import WineToBrand from './components/Wine/WineToBrand';
import WineToDish from './components/Wine/WineToDish';
import DishToWine from './components/Wine/DishToWine';
import { Login, Signup } from './components/AuthForm';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';
import { me } from './store';
import { useDispatch } from 'react-redux';
import AccountPage from './components/account/AccountPage';

const ClientRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [])
  
  return (
    <>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='home' element={<Home/>}/> 
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='wine' element={<Wine/>}/>
        <Route path='wine/recommend-wine' element={<DishToWine/>}/>
        <Route path='wine/recommend-dish' element={<WineToDish/>}/>
        <Route path='wine/recommend-brand' element={<WineToBrand/>}/>
        <Route path='pantry' element={<Pantry/>}/>
        <Route path='account' element={<AccountPage/>}/>
      </Routes>
    </>

  )
}


export default ClientRoutes
