import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import OwnerForm from './OwnerForm';

const CreateOwnerDialog = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggleDialog}>
        Создать владелець
      </Button>

      <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ p: 3 }}>
          <Typography align="center">Создать владелець</Typography>
        </DialogTitle>
        <DialogContent>
          <OwnerForm onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateOwnerDialog;
