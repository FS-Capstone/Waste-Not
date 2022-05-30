import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Link as MaterialLink } from "@mui/material";
import { useTheme } from "@emotion/react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Container for links in nav bar
const LinkContainer = styled(Box)(({theme}) => {
  return{
    width: "100%",
    display: 'flex',
    justifyContent: 'center'
  }
});

//Used for links in nav bar
const Link = styled(MaterialLink)(({theme}) => {
  return{
    fontSize: "25px",
    color: theme.palette.text.secondary,
    margin: '20px',
    "&:hover": {
      color: theme.palette.text.primary,
      textDecoration: "none"
    }
  }
});

//Used for links in account menu
const MenuLink = styled(MaterialLink)(({theme}) => {
  return{
    color: 'inherit',
    textDecoration: 'none'
  }
})




const Navbar = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  //anchor point for account menu
  const [anchorEl, setAnchorEl] = useState(null);
  
  
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => navigate('/')}>
            {/*Could use custom app icon in the future */}
            <HomeIcon fontSize="large"/>
          </IconButton>
          <LinkContainer className="nav-links">
            <Link 
              component={RouterLink} 
              to='/pantry' 
              sx={location.pathname === '/pantry' ? {color: theme.palette.text.primary} : null}>
              Pantry
            </Link>
            <Link 
              component={RouterLink} 
              to='/wine' 
              sx={location.pathname === '/wine' ? {color: theme.palette.text.primary} : null}>
              Wine
            </Link>
          </LinkContainer>
          
          <IconButton 
            onClick={handleMenu}
          >
            <AccountCircleIcon fontSize="large"/>
          </IconButton>
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
                  <MenuItem onClick={() => {handleClose(); dispatch(logout()); navigate('/')}}>Logout</MenuItem> 
                </Box>
                : 
                <Box>
                  <MenuItem onClick={handleClose}><MenuLink to='/login' component={RouterLink}>Log In</MenuLink></MenuItem> 
                  <MenuItem onClick={handleClose}><MenuLink to='/signup' component={RouterLink}>Sign Up</MenuLink></MenuItem> 
                </Box>}
              </Menu>
        
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;