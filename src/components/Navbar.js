import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  
  return(
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to='/'>Home</Link>
          <a href='/' onClick={() => dispatch(logout)}>Logout</a>
        </div>
      ) : (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar;