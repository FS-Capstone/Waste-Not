import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import print from 'print-js';
import html2pdf from 'html2pdf.js';
import {Paper, Box, Button, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import { deleteShoppingItem, addMultiplePantryItems, deleteMultipleShoppingItems } from '../../store';
import PantryAutocomplete from '../PantryAutocomplete';

const ShoppingList = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.ingredients)
  const listIngredients = useSelector(state => state.shoppingList)
  const user = useSelector(state=>state.auth)
  const pantry = useSelector(state => state.selectedPantry)
  const [hidden, setHidden] = useState(false)
  const [display, setDisplay] = useState(false)
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

  const printFunc = async(e, element) => {
    const options = {
      margin: [4,10,13,10],
      filename: 'Shopping List.pdf',
      image: {type: 'jpeg', quality: 0.98},
      jsPdf: {unit: 'in', format:'letter', orientation:'portrait'},
      html2canvas: {scale: 2},
      pagebreak: {mode: 'avoid-all', after:'pageBreak'}
    }

    const pdf = await html2pdf().set(options).from(element).toPdf().get('pdf')

    if(e.target.name === 'download') {
      pdf.save('Shopping List.pdf')
    }
    else {
      const printData = pdf.output('blob');
      const blobUrl = URL.createObjectURL(printData);
      print(blobUrl)
    }
  }

  const handleExport = async(e) => {
    e.preventDefault();
    setHidden(true)
    setDisplay(false)
    await printFunc(e, printRef.current)
    setHidden(false)
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column', paddingTop:'5vh', alignItems:'center', width:'100vw', minHeight:'100vh', backgroundImage:'url("/images/ShoppingListBackground.png")', backgroundSize:'contain', backgroundAttachment:'fixed'}}>
      <Paper ref={printRef} sx={{display:'flex', borderRadius:'5px 5px 0 0', opacity:'.95', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom: 0, height:'100%', width:'100%', maxWidth:'800px', minWidth:'360px'}} onMouseEnter={(e)=> setDisplay(true)} onMouseLeave={(e)=>setDisplay(false)}>
        <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
          <IconButton sx={{display: 'inline', visibility: 'hidden' }}><DownloadIcon/></IconButton>
          <IconButton sx={{display: 'inline', visibility: 'hidden' }}><PrintIcon/></IconButton> 
          <Typography variant='h2' sx={{fontFamily:'Kalam', left:'50%', borderBottom:'3px solid black'}}>Shopping List</Typography>
          <IconButton sx={{display: 'inline', visibility: display ? 'visible' : 'hidden' }}  onClick={handleExport} name='download'><DownloadIcon/></IconButton>
          <IconButton sx={{display: 'inline', visibility: display ? 'visible' : 'hidden' }}  onClick={handleExport} name='print' ><PrintIcon/></IconButton> 
        </Box>
        
        <Box sx={{display:'flex', flexDirection:'column', width:'80%', marginBottom:'1rem'}}>
          {
            listIngredients.map((ingredient, index) => (
              <Box key={ingredient.id} sx={{display:'flex', borderBottom:'3px solid black', marginBottom:'.5rem'}}> 
                <Typography className={index % 16 === 0 ? 'pageBreak' : ''} sx={{fontFamily:'Kalam', cursor:'pointer', textDecoration: selected.includes(ingredient) ? 'line-through' : '' }} variant='h4' onClick={(e) => handleSelect(e, ingredient)}>{ingredient.name}</Typography> 
                {!hidden ? <IconButton onClick={(e)=> handleDelete(e, ingredient)} sx={{marginLeft:'auto'}}><DeleteIcon/></IconButton> : null} 
              </Box>))
          }
        </Box>
      </Paper>
      
      <Box sx={{display:'flex', width:'stretch', borderRadius:'0 0 5px 5px', maxWidth:'800px', minWidth:'360px', backgroundColor:'white', opacity:'.95', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        {!selected.length ? null : <Button sx={{margin:'1rem'}} variant='outlined' onClick={(e)=>handleClick(e)}>Add Selected to Pantry</Button>}
        <PantryAutocomplete searchOptions={ingredients} searchName='shoppingListSearch' selectedPantry={pantry} />
      </Box>
    </Box>

  )
}

export default ShoppingList