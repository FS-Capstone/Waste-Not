import React from 'react';
import Home from './components/Home';
import { Login, Signup } from './components/AuthForm';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { me } from './store';
import { useDispatch } from 'react-redux';

const ClientRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [])
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
      </Routes>
    </>

  )
}


export default ClientRoutes
