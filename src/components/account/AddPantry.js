import React, {useState} from "react";
import { IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { addNewPantry } from '../../store/pantry'

export default function AddPantry({pantry, addVersion}){

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if(editable || name === '') return;

    await dispatch((addNewPantry(name)))
    setName('')
  }

  const handleChange = (evt) =>{
    setName(evt.target.value);
  }

  return(
    <form onSubmit={onSubmit} style={{display: 'flex'}}>

      {editable ? 
        <TextField placeholder="New Pantry Name" value={name} onChange={handleChange}></TextField>
        :
        null
      }
      <IconButton onClick={() => setEditable(!editable)} type='submit'>
        {editable ? <CheckIcon/> : <AddIcon/>}
      </IconButton>
    </form>

  )
}