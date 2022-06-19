import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import print from 'print-js';
import html2pdf from 'html2pdf.js';
import {Paper, Box, Button, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteShoppingItem, addMultiplePantryItems, deleteMultipleShoppingItems } from '../../store';
import PantryAutocomplete from '../PantryAutocomplete';

const ShoppingList = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.ingredients)
  const listIngredients = useSelector(state => state.shoppingList)
  const user = useSelector(state=>state.auth)
  const pantry = useSelector(state => state.selectedPantry)
  const [hidden, setHidden] = useState(false)
  const [selected, setSelected] = useState([]);
  const printRef = useRef();


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

  const hider = () => {
    setHidden(true)
  }

  const handleExport = async(e) => {
    e.preventDefault();
    await hider()
    const element = printRef.current;
    const options = {
      margin: [4,10,13,10],
      filename: 'Shopping List.pdf',
      image: {type: 'jpeg', quality: 0.98},
      jsPdf: {unit: 'in', format:'letter', orientation:'portrait'}
    }

    const pdf = await html2pdf().from(element).set(options).toPdf().get('pdf')

    if(e.target.name === 'download') {
      pdf.save()
    }
    else {
      const printData = pdf.output('blob');
      const blobUrl = URL.createObjectURL(printData);
      print(blobUrl)
    }
    setHidden(false)
  }

  return (
    <Box sx={{display:'flex', marginTop:'5vh', flexDirection:'column', height:'auto', alignItems:'center', width:'100vw'}}>
      <Paper ref={printRef} sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:'2vh', height:'100%', width:'100%', maxWidth:'800px', minWidth:'360px', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
        <Typography variant='h2' sx={{marginTop:'1rem', marginBottom:'1rem', fontFamily:'Kalam', borderBottom:'3px solid black'}}>Shopping List</Typography>
        <Box sx={{display:'flex', flexDirection:'column', width:'80%', marginBottom:'1rem'}}>
          {
            listIngredients.map((ingredient) => (
              <Box key={ingredient.id} sx={{display:'flex', borderBottom:'3px solid black', marginBottom:'.5rem'}}> 
                <Typography sx={{fontFamily:'Kalam', cursor:'pointer', textDecoration: selected.includes(ingredient) ? 'line-through' : '' }} variant='h4' onClick={(e) => handleSelect(e, ingredient)}>{ingredient.name}</Typography> 
                {!hidden ? <IconButton onClick={(e)=> handleDelete(e, ingredient)} sx={{marginLeft:'auto'}}><DeleteIcon/></IconButton> : null} 
              </Box>))
          }
        </Box>
      </Paper>
      {!selected.length ? null : <Button sx={{margin:'1rem'}} variant='outlined' onClick={(e)=>handleClick(e)}>Add Selected to Pantry</Button>}
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Box sx={{display:'flex', marginBottom:'1rem', width:'100%', justifyContent:'space-around'}}>
          <Button onClick={handleExport} name='download' variant='contained'>Download as PDF</Button>
          <Button onClick={handleExport} name='print' variant='contained'>Print</Button>
        </Box>
        <PantryAutocomplete searchOptions={ingredients} searchName='shoppingListSearch' selectedPantry={pantry} />
      </Box>
    </Box>

  )
}

export default ShoppingList