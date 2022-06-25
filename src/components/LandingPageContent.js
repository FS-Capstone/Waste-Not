import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Collapse, Button, Paper, Typography, Box } from "@mui/material";

const LandingContent = styled("div")({
  color: "white",
  display: "flex",
  minHeight: "90vh",
  height:'auto',
  marginTop:'35vh',
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "flex-start",
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
  const navigate = useNavigate();
  const learnMoreRef = useRef();

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Paper sx={{backgroundColor:'transparent', display:'flex', flexDirection:'column', alignItems:'center'}}>
    <LandingContent>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1500 } : {})}
        collapsedheight={50}
      >
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Typography color='white' sx={{fontSize:'4rem', fontFamily:'Nunito'}}> Welcome to Waste Not </Typography>
          <Typography color='white' sx={{fontSize:'2rem', fontFamily:'Nunito'}}> Fighting food waste one kitchen at a time </Typography>
          <Box id='buttonBox' sx={{display:'flex', marginTop:'1rem', justifyContent:'space-evenly !important', width:'100%'}}>
            <Button variant='contained' onClick={()=> learnMoreRef.current?.scrollIntoView({behavior:'smooth'})}> Learn More!!</Button>
            <Typography color='white' sx={{fontSize:'2rem', fontFamily: 'Nunito'}}>or</Typography>
            <Button variant='contained' onClick={()=> navigate('/advancedSearch')}>Get Started</Button>
          </Box>
         
        </Box>
      </Collapse>
    </LandingContent>
    {/* <Box sx={{height:'50vh'}}/> */}
    <Box sx={{display:'flex', alignItems:'center', flexWrap:'wrap', width:'50vw', justifyContent:'center', height:'100vh'}}>
      <Typography ref={learnMoreRef} variant='h4' sx={{fontFamily:'Nunito'}} color='white'>Every year in the US, roughly one-third of all food is wasted. That's almost $50 billion dollars of food, with almost half being fruits and vegetables.</Typography>
    </Box>
    </Paper>

          
  );
};

export default LandingPageContent;
