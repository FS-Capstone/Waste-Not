import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
//import { Card } from '@mui/material'
//import CreatedRecipesAccordion from './CreatedRecipesAccordion';


const CreatedRecipes = () => {
    const [expanded, setExpanded] = useState(false);

    const recipes = useSelector(state => state.auth.recipes || []); // all of the recipes on auth obj, saved & created
    
    //if(!recipes[0]?.createdByUser) return null; // need to refactor

    const createdRecipes = recipes.filter(recipe => recipe.createdByUser === true);

    
    const handleChange = () => {
    }

    const AccordionStyle = styled('div')({
         width: '600px',
         //maxWidth: '600',
         maxHeight: '950', 
         margin: '0 auto', 
         padding: '10px 10px',
    })

    useEffect(()=>{
      window.scrollTo(0,0)
    },[])

    return (
        <div className='create-accordion'>
          {/* <Card style={{maxWidth: 600, maxHeight: 950, margin: '0 auto', padding: '3px 10px', opacity: '0.8'}}> */}
          <h2> Your Created Recipes </h2>
            { createdRecipes.map(createdRecipe => {
                return (
                    <div key={createdRecipe.id}> 
                    <AccordionStyle>
                    <Accordion 
                    // expanded={expanded === 'panel1'} 
                    // onChange={handleChange('panel1')}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        // aria-controls="panel1bh-content"
                        // id="panel1bh-header"
                      >
                        <Typography color='primary' sx={{ width: '75%', flexShrink: 0 }}> {createdRecipe.title} </Typography>
                        <Typography color='primary' sx={{ width: '75%', flexShrink: 0 }}> Cuisine: {createdRecipe.cuisine} </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component={'span'}>
                        <div>Prep Time: {createdRecipe.prepTime}</div>
                        <div>Cook Time: {createdRecipe.cookTime}</div>
                        <div>Ingredients: {createdRecipe.ingredients}</div>
                        <div>Instructions: {createdRecipe.instructions}</div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionStyle>
                  </div>
                )
            })}
            {/* </Card> */}
        </div>
    )
}


export default CreatedRecipes;


