import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
//import CreatedRecipesAccordion from './CreatedRecipesAccordion';

const CreatedRecipes = () => {
    const [expanded, setExpanded] = useState(false);

    const recipes = useSelector(state => state.auth.recipes || []); // all of the recipes on auth obj, saved & created
    
    //if(!recipes[0]?.createdByUser) return null; // need to refactor

    const createdRecipes = recipes.filter(recipe => recipe.createdByUser === true);

    
    const handleChange = () => {
    }

    const AccordionStyle = styled('div')({
         width: '700px',
         //maxWidth: '600',
         maxHeight: '950', 
         margin: '0 auto', 
         padding: '3px 10px',
    })

    return (
        <div className='create-accordion'>
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
        </div>
    )
}

                // <CreatedRecipesAccordion 
                // key={createdRecipe.id} 
                // title={createdRecipe.title} 
                // cuisine={createdRecipe.cuisine}
                // cookTime={createdRecipe.cookTime}
                // prepTime={createdRecipe.prepTime}
                // ingredients={createdRecipe.ingredients}
                // instructions={createdRecipe.instructions}
                // />

                // (
                //     <li key={createdRecipe.id}> 
                //     <div>{createdRecipe.title} </div>
                //     <div>{createdRecipe.cuisine}</div>
                //     <div>{createdRecipe.cookTime}</div>
                //     <div>{createdRecipe.prepTime}</div>
                //     <div>{createdRecipe.ingredients}</div>
                //     <div>{createdRecipe.instructions}</div>
                //     </li>

export default CreatedRecipes;

