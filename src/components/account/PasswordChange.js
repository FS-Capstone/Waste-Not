import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormGroup, FormHelperText, IconButton, Input, InputLabel } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { changePassword } from '../../store';
import { useDispatch } from 'react-redux';


export default function PasswordChange({open, handleClose}) {
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if((inputs.oldPassword === '') || (inputs.newPassword === '') || (inputs.repeatPassword === '')){
      setError('Please fill out all required fields');
      return;
    }

    if(inputs.newPassword !== inputs.repeatPassword){
      setError('Passwords do not match');
      return;
    }

    try{
      await dispatch(changePassword(inputs.oldPassword, inputs.newPassword));
    }
    catch(error){
      setError('Invalid password')
    }
    handleClose();
  }

  const handleChange = (evt) => {
    setInputs({...inputs, [evt.target.name]: evt.target.value})
    setError('');
  }

  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <FormGroup sx={style}>
        <Typography id="modal-modal-title" variant="h5" component='h2' sx={{textAlign:'center'}}>
          Change Your Password?
        </Typography>
        <form 
          style={{display: 'flex', flexDirection:'column', alignItems:'center', margin: '20px'}}
          onSubmit={onSubmit}
          >
          <InputLabel htmlFor='my-input'>
            Old Password
          </InputLabel>
          <Input name='oldPassword' value={inputs.oldPassword} onChange={handleChange} type='password'/>

          <InputLabel htmlFor='my-input'>
            New Password
          </InputLabel>
          <Input name='newPassword' value={inputs.newPassword} onChange={handleChange} type='password'/>

          <InputLabel htmlFor='my-input'>
            Retype New Password
          </InputLabel>
          <Input name='repeatPassword' value={inputs.repeatPassword} onChange={handleChange} type='password'/>
          
          
          
          <IconButton sx={{alignSelf:'flex-end'}} type='submit'>
            <CheckIcon/>
          </IconButton>
        </form>
        <FormHelperText type='submit' variant='outlined' sx={{textAlign:'center', color:'red'}}>{error}</FormHelperText>
      </FormGroup>

    </Modal>
  )
}