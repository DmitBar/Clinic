import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Animal } from '..';
import { Edit } from '@mui/icons-material';
import EditAnimalForm from './EditAnimalForm';

interface EditAnimalDialogProps {
  animal: Animal;
}

const EditAnimalDialog = ({ animal }: EditAnimalDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton color="info" onClick={handleToggleDialog}>
        <Edit />
      </IconButton>

      <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
            Изменить животное
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditAnimalForm animal={animal} onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAnimalDialog;
