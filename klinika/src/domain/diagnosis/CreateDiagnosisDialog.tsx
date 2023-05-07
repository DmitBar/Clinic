import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import DiagnosisForm from './DiagnosisForm';

const CreateDiagnosisDialog = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggleDialog}>
        Создать диагноз
      </Button>

      <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
            Создать диагноз
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DiagnosisForm onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDiagnosisDialog;
