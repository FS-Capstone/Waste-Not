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
  const continueRef = useRef();
  const secondRef = useRef();
  const finalRef = useRef();

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
            <Button variant='contained' onClick={()=> learnMoreRef.current?.scrollIntoView({behavior:'smooth', block:'center', inline:'center'})}> Learn More!!</Button>
            <Typography color='white' sx={{fontSize:'2rem', fontFamily: 'Nunito'}}>or</Typography>
            <Button variant='contained' onClick={()=> navigate('/advancedSearch')}>Get Started</Button>
          </Box>
         
        </Box>
      </Collapse>
    </LandingContent>
    {/* <Box sx={{height:'50vh'}}/> */}
    <Box sx={{display:'flex', flexDirection:'column',  alignItems:'center', flexWrap:'wrap', width:'50vw', justifyContent:'center', height:'100vh'}}>
      <Typography ref={learnMoreRef} variant='h4' sx={{fontFamily:'Nunito'}} color='white'>Every year in the US, roughly one-third of all food is wasted. That's almost $50 billion dollars of food, with almost half being fruits and vegetables.</Typography>
      <Button variant='contained' sx={{marginTop:'1rem'}} onClick={()=> continueRef.current?.scrollIntoView({behavior:'smooth', block:'center', inline:'center'})}> Continue</Button>
    </Box>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', flexWrap:'wrap', width:'50vw', justifyContent:'center', height:'100vh'}}>
      <Typography ref={continueRef} variant='h4' sx={{fontFamily:'Nunito'}} color='white'>Waste Not helps you manage your pantry, suggesting recipes using the ingredients you already have and helping you to cut down on your household's food waste.</Typography>
      <Button variant='contained' sx={{marginTop:'1rem'}} onClick={()=> secondRef.current?.scrollIntoView({behavior:'smooth', block:'center', inline:'center'})}> Continue</Button>
    </Box>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', flexWrap:'wrap', width:'50vw', justifyContent:'center', height:'100vh'}}>
      <Typography ref={secondRef} variant='h4' sx={{fontFamily:'Nunito'}} color='white'>It also allows you to build your own recipe book with saved recipes, create a shopping list for those missing items, and search for new recipes based on meal type, cuisine, dietary restrictions, and more!</Typography>
      <Button variant='contained' sx={{marginTop:'1rem'}} onClick={()=> finalRef.current?.scrollIntoView({behavior:'smooth', block:'center', inline:'center'})}> Continue</Button>
    </Box>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', flexWrap:'wrap', width:'50vw', justifyContent:'center', height:'100vh'}}>
      <Typography ref={finalRef} variant='h4' sx={{fontFamily:'Nunito'}} color='white'>What are you waiting for?! Fill your pantry now and join the fight against food waste!</Typography>
      <Button variant='contained' sx={{marginTop:'1rem'}} onClick={()=> navigate('/advancedSearch')}>Get Started</Button>
    </Box>
    </Paper>

          
  );
};

export default LandingPageContent;
