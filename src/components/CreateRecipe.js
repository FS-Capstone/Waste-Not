import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createRecipe } from '../store/recipes';

const CreateRecipe = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [cookTime, setCookTime] = useState('')

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleIngredientsChange = (e) => {
        setIngredients(e.target.value)
    }
    const handleInstructionsChange = (e) => {
        setInstructions(e.target.value)
    }
    const handleCuisineChange = (e) => {
        setCuisine(e.target.value)
    }
    const handlePrepTimeChange = (e) => {
        setPrepTime(e.target.value)
    }
    const handleCookTimeChange = (e) => {
        setCookTime(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log(title, cuisine, prepTime, cookTime, ingredients, instructions)
        console.log('dispatch thunk here')
        dispatch(createRecipe(title, cuisine, prepTime, cookTime, ingredients, instructions));
    }

    return (
        <div className='createForm'>
            <h2> Create Your Own Recipe </h2>
            <div>
                <form onSubmit={handleSubmit}> 
                    <Box>
                    <div>
                        <TextField 
                        label='Title' 
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={title}
                        onChange={(e) => handleTitleChange(e)}
                        />
                        <TextField 
                        label='Cuisine'
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={cuisine}
                        onChange={(e) => handleCuisineChange(e)} 
                        />
                    </div>
                    <div>
                        <TextField 
                        label='Prep Time'
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={prepTime}
                        onChange={(e) => handlePrepTimeChange(e)} 
                        />
                        <TextField 
                        label='Cook Time'
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={cookTime}
                        onChange={(e) => handleCookTimeChange(e)} 
                        />
                    </div>
                    <div>
                        <TextField 
                        label='Ingredients' 
                        variant="outlined"
                        multiline
                        rows={10}
                        sx={{ m: 1, width: '50ch' }}
                        value={ingredients}
                        onChange={(e) => handleIngredientsChange(e)}
                        />
                    </div>
                    <div>
                        <TextField 
                        label='Instructions'  
                        variant="outlined"
                        multiline
                        rows={10}
                        sx={{ m: 1, width: '50ch' }}
                        value={instructions}
                        onChange={(e) => handleInstructionsChange(e)}
                        />
                    </div>
                    <Button variant="contained" size="small" type='submit'> Save </Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe; 
