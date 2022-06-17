import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Paper, Box, Button, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteShoppingItem, addMultiplePantryItems, deleteMultipleShoppingItems } from '../../store';

// import kalamLight from '../../../public/fonts/Kalam-Light.ttf';

//grocery_list has 17 lines
const ShoppingList = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.shoppingList)
  const user = useSelector(state=>state.auth)
  const pantry = useSelector(state => state.selectedPantry)
  const [hidden, setHidden] = useState(false)
  const [selected, setSelected] = useState([]);


  const handleDelete = (e, ingredient) => {
    e.preventDefault()
    dispatch(deleteShoppingItem(ingredient, user.id))
  }

  const handleSelect = (e, ingredient) => {
    e.preventDefault();
    if (!selected.includes(ingredient)){
      setSelected([...selected, ingredient])
     } else {
      setSelected(selected.filter(_ingredient => _ingredient !== ingredient))
     }
  };

  const handleClick = e => {
    e.preventDefault();
    const selectedIds = selected.map(ingredient => ingredient.id)
    dispatch(addMultiplePantryItems(selectedIds, pantry.id))
    dispatch(deleteMultipleShoppingItems(selected, user.id))
  }

  return (
    <Box sx={{display:'flex', marginTop:'5vh', flexDirection:'column', height:'auto', alignItems:'center', width:'100vw'}}>
      <Paper sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:'2vh', height:'100%', width:'100%', maxWidth:'800px', minWidth:'360px', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
        <Typography variant='h2' sx={{marginTop:'1rem', marginBottom:'1rem', fontFamily:'Kalam', borderBottom:'3px solid black'}}>Shopping List</Typography>
        <Box sx={{display:'flex', flexDirection:'column', width:'80%', marginBottom:'1rem'}}>
          {
            ingredients.map((ingredient) => (
              <Box sx={{display:'flex', borderBottom:'3px solid black', marginBottom:'.5rem'}}> 
                <Typography key={ingredient.id} sx={{fontFamily:'Kalam', cursor:'pointer', textDecoration: selected.includes(ingredient) ? 'line-through' : '' }} variant='h4' onClick={(e) => handleSelect(e, ingredient)}>{ingredient.name}</Typography> 
                {!hidden ? <IconButton onClick={(e)=> handleDelete(e, ingredient)} sx={{marginLeft:'auto'}}><DeleteIcon/></IconButton> : null} 
              </Box>))
          }
        </Box>
      </Paper>
      {!selected.length ? null : <Button onClick={(e)=>handleClick(e)}>Add Selected to Pantry</Button>}
    </Box>

  )
}

export default ShoppingList