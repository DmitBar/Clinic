import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import AnimalForm from './AnimalForm';

const CreateAnimalDialog = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggleDialog}>
        Создать животное
      </Button>

      <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
            Создать животное
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AnimalForm onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAnimalDialog;
