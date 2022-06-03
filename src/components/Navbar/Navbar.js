import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Link as MaterialLink } from "@mui/material";
import { useTheme } from "@emotion/react";
import MenuIcon from '@mui/icons-material/Menu';
import { openPantry } from "../../store/pantry";
import AccountMenu from "./AccountMenu";

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






const Navbar = (props) => {
  const dispatch = useDispatch();
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

  //Don't display nav bar on the landing page.
  if(location.pathname === '/')
    return null;

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
          
          {/* opens the pantry */}
          <IconButton onClick={() => dispatch(openPantry())}>
            <MenuIcon ></MenuIcon>
          </IconButton>
          <AccountMenu handleClose={handleClose} anchorEl={anchorEl}/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;