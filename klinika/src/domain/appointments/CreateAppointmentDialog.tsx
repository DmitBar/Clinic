import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import AppointmentForm from './AppointmentForm';

const CreateAppointmentDialog = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggleDialog}>
        Создать прием
      </Button>

      <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ p: 3 }}>
          <Typography align="center">
            Создать прием
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AppointmentForm onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAppointmentDialog;
