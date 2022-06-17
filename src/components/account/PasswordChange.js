import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import { FormGroup, Input, InputLabel } from '@mui/material';

export default function PasswordChange({open, handleClose}) {
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

  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <FormGroup sx={style}>
        <Typography id="modal-modal-title" variant="h5" component='h2'>
          Change Your Password?
        </Typography>
        <FormControl>
          <InputLabel htmlFor='my-input'>
            Old Password
          </InputLabel>
          <Input/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>
            New Password
          </InputLabel>
          <Input/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>
            Retype New Password
          </InputLabel>
          <Input/>
        </FormControl>
      </FormGroup>

    </Modal>
  )
}