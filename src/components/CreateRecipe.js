import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createRecipe } from '../store/recipes';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ConfirmationDialog from './ConfirmationDialog';

const CreateRecipeBackground = styled('div')({
    height: '105vh',
    minHeight: '100vh',
    color: 'white',
    backgroundImage: 'url("/images/LandingPage3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
})

const CreateRecipe = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [open, setOpen] = useState(false);

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
        setOpen(true);
    }

    const handleOnClose = () => {
        setOpen(false)
    }

    return (
        <CreateRecipeBackground>
        <div className='createForm'> 
        <Card style={{maxWidth: 600, maxHeight: 950, margin: '0 auto', padding: '3px 10px', opacity: '0.8'}}>
            <CardContent>
                <Typography gutterBottom variant="h5"> Create Your Own Recipe </Typography>
                <Typography gutterBottom color="textSecondary" variant="body2" component="p"> Add Your Own Personal Recipes and Save Them To Your Profile </Typography>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                        <TextField 
                        label='Title' 
                        variant="outlined"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => handleTitleChange(e)}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField 
                        label='Cuisine'
                        variant="outlined"
                        fullWidth
                        required
                        value={cuisine}
                        onChange={(e) => handleCuisineChange(e)} 
                        />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField 
                        label='Prep Time'
                        variant="outlined"
                        fullWidth
                        value={prepTime}
                        onChange={(e) => handlePrepTimeChange(e)} 
                        />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField 
                        label='Cook Time'
                        variant="outlined"
                        fullWidth
                        value={cookTime}
                        onChange={(e) => handleCookTimeChange(e)} 
                        />
                    </Grid>
                    <Grid xs={12} item>
                        <TextField 
                        label='Ingredients' 
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={10}
                        value={ingredients}
                        onChange={(e) => handleIngredientsChange(e)} 
                        />
                    </Grid>
                    <Grid xs={12} item>
                        <TextField 
                        label='Instructions' 
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={10}
                        value={instructions}
                        onChange={(e) => handleInstructionsChange(e)} 
                        />
                    </Grid>
                    <Grid xs={12} item>
                    <Button variant="contained" fullWidth type='submit'> Save </Button>
                    <ConfirmationDialog open={open} onClose={handleOnClose} />
                    </Grid>
                </Grid>
                </form>
            </CardContent>
        </Card>
        
        
        </div>
        </CreateRecipeBackground>
    )
}

export default CreateRecipe; 
