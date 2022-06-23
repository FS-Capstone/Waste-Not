import React from 'react';
import { Dialog } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogContent } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationDialog = (props) => {
 
    const { open, onClose } = props;

    // onclick x function here
    const handleOnClose = () => {
        onClose(false)
    }

    return (
        <Dialog open={open} onClose={handleOnClose}>
            <DialogContent>
            <DialogContentText color='primary'>
                    <CheckCircleIcon />
                    Recipe Saved! 
            </DialogContentText>
            <DialogContentText color='primary'>
                    <Link to='/createdRecipes'>View Saved Recipes</Link> 
            </DialogContentText>
            </DialogContent>
        </Dialog>
    )
} 

export default ConfirmationDialog;