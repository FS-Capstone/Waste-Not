import React, { useState } from 'react';
import { IconButton, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { changeUsername } from '../../store';
import { useDispatch } from 'react-redux';

export default function UsernameEdit({username}) {
  const [editable, setEditable] = useState(false);
  const [newName, setNewName] = useState('');
  const dispatch = useDispatch();

  const handleChange = (evt) =>{
    setNewName(evt.target.value);
  }

  const onSubmit = async (evt) =>{
    evt.preventDefault()
    if(newName === '')
      return;
    
      await dispatch(changeUsername(newName));

    setNewName('');
  }

  return (
    <form style={{display:'flex', justifyContent:'center'}} onSubmit={onSubmit}>
      {editable ? 
        <TextField 
          sx={{textAlign: 'center', padding:'20px 0 20px 20px', color: 'white'}}
          placeholder={username}
          value={newName}
          onChange={handleChange}
        />
      :
        <Typography variant="h4" sx={{textAlign: 'center', padding:'20px 0 20px 20px'}}>{username}</Typography>
      }
      
      {
        editable ? 
        <IconButton onClick={() => setEditable(!editable)} type='button'>
          <CheckIcon fontSize='small'/>
        </IconButton>
        
      :
        <IconButton onClick={() => setEditable(!editable)} type='submit'>
          <EditIcon fontSize='small'/>
        </IconButton>
      }
    </form>
    
  )
}