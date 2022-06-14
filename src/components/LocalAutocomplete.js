import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TextField, Autocomplete} from '@mui/icons-material';
import addPantryItem from '../store';

const PantryAutocomplete = ({searchOptions, searchName, selectedPantry}) => {
  const [ingredient, setIngredient] = useState(searchOptions[0])
  const dispatch = useDispatch();
  const user = useSelector(state=>state.auth)
  const localPantry = window.localStorage.getItem('pantry')
  const handleChange = e => {
    e.preventDefault();
    setIngredient(e.target.value)
    const newPantryItem = ingredient
    if(!user.id){
      localPantry.push(newPantryItem)
    }
    dispatch(addPantryItem(newPantryItem.id, selectedPantry.id))
  }
  
  return(
    <Autocomplete
      disablePortal
      autoHighlight
      value={ingredient}
      onChange={(e)=> handleChange(e)}
      id={searchName}
      options={searchOptions}
      getOptionLabel={(option) => option.ingredient}
      renderInput={(params)=> <TextField {...params} label='Search...'/> }
    />
  )
}

export default PantryAutocomplete