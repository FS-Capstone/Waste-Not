import React from 'react';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';

const ConfirmationDialog = (props) => {
 
    const { open, onClose } = props;

    // onclick x function here
    const handleOnClose = () => {
        onClose(false)
    }

    return (
        <Dialog open={open} onClose={handleOnClose}>
            <DialogContent>
                <div>
                    Success! Recipe Saved 
                </div>
                <div>
                    View Saved Recipes
                </div>
            </DialogContent>
        </Dialog>
    )
} 

export default ConfirmationDialog;