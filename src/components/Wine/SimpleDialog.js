// for Brand Resules (rename later)

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';

const SimpleDialog = (props) => {
    const { open, onClose, selectedbrand } = props

    const handleOnClose = () => {
        onClose(false)
    }

    return (
        <Dialog 
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

export default SimpleDialog