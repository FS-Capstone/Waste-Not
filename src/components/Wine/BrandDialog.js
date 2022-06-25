import React from 'react';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';

const BrandDialog = (props) => {
    const { open, onClose, selectedbrand } = props

    const handleOnClose = () => {
        onClose(false)
    }

    return (
        <Dialog 
         BackdropProps={{ invisible: true, backgroundColor: 'transparent' }} // no idea how to make this border go away!
        onClose={handleOnClose}
        open={open}
        selectedbrand={selectedbrand}
        >
        <DialogTitle> {selectedbrand.title} </DialogTitle> 
        <DialogContent> 
            <div> {selectedbrand.price} <a href={selectedbrand.link}> Purchase </a></div>
            <div> {selectedbrand.description} </div>
        </DialogContent>
        </Dialog>
    )
} 

export default BrandDialog