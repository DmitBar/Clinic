import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Diagnosis } from '..';
import EditDiagnosisForm from './EditDiagnosisForm';

interface CreateDiagnosisDialogProps {
  diagnosis: Diagnosis;
}

const EditDiagnosisDialog = ({ diagnosis }: CreateDiagnosisDialogProps) => {
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
          <Typography align="center">Изменить диагноз</Typography>
        </DialogTitle>
        <DialogContent>
          <EditDiagnosisForm
            diagnosis={diagnosis}
            onClose={handleToggleDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditDiagnosisDialog;
