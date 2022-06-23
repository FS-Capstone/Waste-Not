import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Modal from "./Modal";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const username = useSelector((state) => state.auth.username);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='top-level-page'>
      <div className="mainpantry">
        <Button
          sx={{ marginRight: "10rem", padding: "1px" }}
          variant="contained"
          onClick={() => setIsOpen(true)}
        >
          Tour Web Application
        </Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Welcome to JJZS Capstone Project.
          <div>Let's Begin By Creating An Account OR Logging In</div>
          <img
            src="/images/profileimage.jpg"
            alt=""
            style={{ width: "50px" }}
          />
        </Modal>
        <h1 align="center">Create React Full Stack App</h1>
        {username ? <h3>{`Welcome, ${username}`}</h3> : null}
      </div>
      )
    </div>
  );
};

export default Home;
