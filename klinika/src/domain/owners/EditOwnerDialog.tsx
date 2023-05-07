import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import EditOwnerForm from './EditOwnerForm';
import { Owner } from '..';

interface EditOwnerDialogProps {
  owner: Owner;
}

const EditOwnerDialog = ({ owner }: EditOwnerDialogProps) => {
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
          <Typography align="center">Изменить владелець</Typography>
        </DialogTitle>
        <DialogContent>
          <EditOwnerForm owner={owner} onClose={handleToggleDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditOwnerDialog;
