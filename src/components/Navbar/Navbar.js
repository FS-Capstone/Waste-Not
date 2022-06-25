import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link as MaterialLink } from "@mui/material";
import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "./AccountMenu";
import PantryDrawer from "../pantry/PantryDrawer";

//Container for links in nav bar
const LinkContainer = styled(Box)(({ theme }) => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };
});

//Used for links in nav bar
const Link = styled(MaterialLink)(({ theme }) => {
  return {
    fontSize: "1.3em",
    color: theme.palette.text.disabled,
    margin: "0 14px 0 14px",
    "&:hover": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  };
});

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  //anchor point for account menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [pantryDrawerOpen, setPantryDrawerOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        width: "100%",
        zIndex: 99,
      }}
    >
      <AppBar
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          position: "initial",
          width: "60vw",
          borderRadius: "0 0 10px 10px",
          opacity: 0.95,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: "center",
            width: "fit-content",
          }}
        >
          <IconButton onClick={() => navigate("/")}>
            {/*Could use custom app icon in the future */}
            <HomeIcon fontSize="small" />
          </IconButton>
          <LinkContainer className="nav-links" sx={{ width: "fit-content" }}>
            <Link
              component={RouterLink}
              to="/pantry"
              sx={
                location.pathname === "/pantry"
                  ? { color: theme.palette.text.primary }
                  : null
              }
            >
              Pantry
            </Link>
            <Link
              component={RouterLink}
              to="/wine"
              sx={
                location.pathname === "/wine"
                  ? { color: theme.palette.text.primary }
                  : null
              }
            >
              Wine
            </Link>
            <Link
              component={RouterLink}
              to="/advancedSearch"
              sx={
                location.pathname === "/advancedSearch"
                  ? { color: theme.palette.text.primary }
                  : null
              }
            >
              Search
            </Link>
            <Link
              component={RouterLink}
              to="/create-recipe"
              sx={
                location.pathname === "/create-recipe"
                  ? { color: theme.palette.text.primary }
                  : null
              }
            >
              Create a recipe
            </Link>
          </LinkContainer>

          <IconButton onClick={handleMenu}>
            <AccountCircleIcon fontSize="small" />
          </IconButton>

          <AccountMenu handleClose={handleClose} anchorEl={anchorEl} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
