import React, {useState, useEffect, forwardRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TextField, Snackbar, Autocomplete} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {addPantryItem, addShoppingItem} from '../store';





const PantryAutocomplete = ({searchOptions, searchName, selectedPantry}) => {
  const [value, setValue] = useState(searchOptions[0]);
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitState, setSubmitState] = useState(true)
  const dispatch = useDispatch();
  const user = useSelector(state=>state.auth)
  const shoppingList = useSelector(state => state.shoppingList)
  const listIds = shoppingList.map(ingredient => ingredient.id)
  let localPantry;
  if(window.localStorage.getItem('pantry')){
    localPantry = window.localStorage.getItem('pantry')
  } else {
    window.localStorage.setItem('pantry', [])
  }

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  
  return(
    <div style={{width:'400px', marginTop:'10px', marginBottom:'10px'}}>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert 
          onClose={handleClose}
          severity={submitState ? 'success' : 'warning'}
          sx={{width:'auto'}}
        >
          {submitMessage}
        </Alert>
      </Snackbar>
      <Autocomplete
        disablePortal
        autoHighlight
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue, searchOptions[0])
          const pantryItems = selectedPantry.ingredients.map(item => item.name)
          if(!newValue?.name)
            return;
          else if(searchName === 'shoppingListSearch'){
            const ingredient = {id: newValue.id, name: newValue.name}
            if(!listIds.includes(ingredient.id)){
              dispatch(addShoppingItem(ingredient, user.id))
              setSubmitMessage(`${ingredient.name} added to Shopping List`);
              setSubmitState(true);
              setOpen(true)
            }
            else {
              setSubmitMessage(`${ingredient.name} is already on your shopping list!`);
              setSubmitState(false);
              setOpen(true)
            }
          }
          // if(!user.id && !pantryItems.includes(newValue.ingredient)){
          //   localPantry.push(newValue);
          //   setSubmitMessage(`${newValue.name} added to ${selectedPantry.name}`);
          //   setSubmitState(true);
          //   setOpen(true)
          // } 
          else if (/*user.id && */!pantryItems.includes(newValue.ingredient)){
            dispatch(addPantryItem(newValue.id, selectedPantry.id))
            setSubmitMessage(`${newValue.name} added to ${selectedPantry.name}`);
            setSubmitState(true);
            setOpen(true)
          } else {
            setSubmitMessage(`${selectedPantry.name} already contains ${newValue.name}`)
            setSubmitState(false);
            setOpen(true)
          }
        
        }}
        id={searchName}
        inputvalue={inputValue}
        onInputChange={(e, newInputValue)=>{setInputValue(newInputValue)}}
        options={searchOptions}
        getOptionLabel={(option) => option.name}
        renderInput={(params)=> <TextField {...params} id='searchField' label={searchName === 'shoppingListSearch' ? 'Add to your shopping list' : 'Add an item to your pantry'}/> }
      />
    </div>
  )
}

export default PantryAutocomplete