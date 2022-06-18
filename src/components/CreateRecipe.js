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
    const [cookTime, setCookTime] = useState('')

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
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
    const handleCookTimeChange = () => {
        setCookTime(cookTime)
    }

    return (
        <div className='createForm'>
            <h2> Create Your Own Recipe </h2>
            <div>
                <form> 
                    <Box>
                    <div>
                        <TextField 
                        label='title' 
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={title}
                        onChange={(e) => handleTitleChange(e)}
                        />
                        <TextField 
                        label='cuisine'
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={cuisine}
                        onChange={handleCuisineChange} 
                        />
                    </div>
                    <div>
                        <TextField 
                        label='prepTime'
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={prepTime}
                        onChange={handlePrepTimeChange} 
                        />
                        <TextField 
                        label='cookTime'
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={cookTime}
                        onChange={handleCookTimeChange} 
                        />
                    </div>
                    <div>
                        <TextField 
                        label='ingredients' 
                        variant="outlined"
                        multiline
                        rows={10}
                        sx={{ m: 1, width: '50ch' }}
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
                        sx={{ m: 1, width: '50ch' }}
                        value={instructions}
                        onChange={handleInstructionsChange}
                        />
                    </div>
                    <Button variant="contained" size="small"> Save </Button>
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

*/