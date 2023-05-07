import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Appointment } from '..';
import EditAppointmentForm from './EditAppointmentForm';

interface EditAppointmentDialogProps {
  appointment: Appointment;
}

const EditAppointmentDialog = ({appointment}: EditAppointmentDialogProps) => {
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
          <Typography align="center">Изменить прием</Typography>
        </DialogTitle>
        <DialogContent>
          <EditAppointmentForm appointment={appointment} onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAppointmentDialog;
