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
        <MenuItem onClick={handleClose}><MenuLink to='/account' component={RouterLink}>My account</MenuLink></MenuItem>
        <MenuItem onClick={handleClose}><MenuLink to='/shoppingList' component={RouterLink}>My Shopping List</MenuLink></MenuItem>
        <MenuItem onClick={handleClose}><MenuLink to='/savedRecipes' component={RouterLink}>View Saved Recipes</MenuLink></MenuItem>
        <MenuItem onClick={() => {handleClose(); dispatch(logout()); navigate('/')}}>Logout</MenuItem> 
      </Box>
      : 
      <Box>
        <MenuItem onClick={handleClose}><MenuLink to='/login' component={RouterLink}>Log In</MenuLink></MenuItem> 
        <MenuItem onClick={handleClose}><MenuLink to='/shoppingList' component={RouterLink}>My Shopping List</MenuLink></MenuItem>
        <MenuItem onClick={handleClose}><MenuLink to='/signup' component={RouterLink}>Sign Up</MenuLink></MenuItem>
      </Box>}
    </Menu>
  )
}

