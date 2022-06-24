import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Collapse } from "@mui/material";

const LandingContent = styled("div")({
  color: "white",
  display: "flex",
  height: "90vh",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  fontFamily: "Nunito",
  h1: {
    fontSize: "4rem",
    margin: "0",
  },
  h2: {
    fontSize: "2rem",
    textAlign: "center",
  },
  div: {
    justifyContent: "center",
    textAlign: "center",
    textDecoration: "none",
  },
});

const LandingPageContent = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <LandingContent>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1500 } : {})}
        collapsedheight={50}
      >
        <div>
          <h1> Welcome to Our Capstone Project </h1>
          <h2> (Tagline) </h2>
        </div>
      </Collapse>
    </LandingContent>
  );
};

export default LandingPageContent;
