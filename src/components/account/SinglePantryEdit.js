import React, {useState} from "react";
import { IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { editPantryName } from "../../store/pantry";
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePantry } from "../../store/pantry";

export default function SinglePantryEdit({pantry, addVersion}){

  const [editable, setEditable] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if(editable || newName === '') return;

    await dispatch((editPantryName(pantry, newName)))
    setNewName('')
  }

  const handleChange = (evt) =>{
    setNewName(evt.target.value);
  }

  const remove = async () =>{
    try{
      await dispatch(deletePantry(pantry));
    }
    catch(error){
      setError(error.response.data);
    }
  }
  

  return(
    <form onSubmit={onSubmit} style={{display: 'flex', flexWrap:'wrap'}}>

      {editable ? 
        <TextField placeholder={pantry.name} value={newName} onChange={handleChange}></TextField>
        :
        <Typography variant="h5">{pantry.name}</Typography>
      }
      <IconButton onClick={() => setEditable(!editable)} type='submit'>
        {editable ? <CheckIcon/> : <EditIcon/>}
      </IconButton>

      <IconButton onClick={remove}>
        <DeleteIcon/>
      </IconButton>
      <Typography variant="subtitle2" sx={{flexBasis:'100%', color:'error.main'}}>{error}</Typography>
    </form>

  )
}