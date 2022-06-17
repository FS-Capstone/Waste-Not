import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const CreateRecipe = () => {

    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [prepTime, setPrepTime] = useState('')


    const handleTitleChange = () => {
        setTitle(title)
    }
    const handleIngredientsChange = () => {
        setIngredients(ingredients)
    }
    const handleInstructionsChange = () => {
        setInstructions(instructions)
    }
    const handleCuisineChange = () => {
        setCuisine(cuisine)
    }
    const handlePrepTimeChange = () => {
        setPrepTime(prepTime)
    }

    return (
        <div className='createForm'>
            <h2> Create Your Own Recipe </h2>
            <div>
                <form>
                    <Box sx={{ width: 500 }}>
                    <div>
                        <TextField 
                        label='title' 
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <TextField 
                        label='ingredients' 
                        variant="outlined"
                        multiline
                        rows={10}
                        value={ingredients}
                        onChange={handleIngredientsChange}
                        />
                    </div>
                    <div>
                        <TextField 
                        label='instructions'  
                        variant="outlined"
                        multiline
                        rows={10}
                        value={instructions}
                        onChange={handleInstructionsChange}
                        />
                    </div>
                    <div>
                        <TextField 
                        label='cuisine'
                        variant="outlined"
                        value={cuisine}
                        onChange={handleCuisineChange} 
                        />
                    </div>
                    <div>
                        <TextField 
                        label='prepTime'
                        variant="outlined"
                        value={prepTime}
                        onChange={handlePrepTimeChange} 
                        />
                    </div>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe; 

/*
- Probably going to store these recipes on the database (create recipe model?) so need to use redux store
- Need a POST api route on server for input data (refer to JPFP)
- also need to render resulting recipe in some kind of nice format after submitting the recipe.
 - or maybe first option is the create the recipe, second option after the render of results is to save it? idk.

- need to create recipe model
- need reducer and thunks 
- need api post route for input fields 

Create Your Own Recipe POST ROUTE

router.post('/recipes/createRecipe', async (req, res, next) => {
    try {
    const newRecipe = {
        title: req.body.title,
        author: req.body.author, // meh...
        cuisine: req.body.cuisine,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        createdByUser: true,
        // pantryId? 
    }
    res.send(await Recipe.create(newRecipe))
    }
    catch(ex){
        next(ex)
    }
});

*/