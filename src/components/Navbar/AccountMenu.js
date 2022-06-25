import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import { Link as MaterialLink } from "@mui/material";
import Box from '@mui/material/Box';
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function AccountMenu({anchorEl, handleClose}){
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Used for links in account menu
  const MenuLink = styled(MaterialLink)(({theme}) => {
    return{
      color: 'inherit',
      textDecoration: 'none'
    }
  })

  return(
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {isLoggedIn ? 
      <Box>
        <MenuLink to='/account' component={RouterLink}><MenuItem onClick={handleClose}>My account</MenuItem></MenuLink>
        <MenuLink to='/shoppingList' component={RouterLink}><MenuItem onClick={handleClose}>My Shopping List</MenuItem></MenuLink>
        <MenuLink to='/savedRecipes' component={RouterLink}><MenuItem onClick={handleClose}>View Saved Recipes</MenuItem></MenuLink>
        <MenuLink to='/createdRecipes' component={RouterLink}><MenuItem onClick={handleClose}>View Created Recipes</MenuItem></MenuLink>
        <MenuItem onClick={() => {handleClose(); dispatch(logout()); navigate('/')}}>Logout</MenuItem> 
      </Box>
      : 
      <Box>
        <MenuLink to='/login' component={RouterLink}><MenuItem onClick={handleClose}>Log In</MenuItem></MenuLink>
        <MenuLink to='/shoppingList' component={RouterLink}><MenuItem onClick={handleClose}>My Shopping List</MenuItem></MenuLink>
        <MenuLink to='/signup' component={RouterLink}><MenuItem onClick={handleClose}>Sign Up</MenuItem></MenuLink>
      </Box>}
    </Menu>
  )
}

