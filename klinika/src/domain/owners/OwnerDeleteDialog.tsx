import { Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import _axios from '../../utils/axios';

const deleteOwner = async (id: number) => {
  await _axios.delete('/api/Owner/' + id);
};

interface OwnerDeleteDialogProps {
  id: number;
}

const OwnerDeleteDialog = ({ id }: OwnerDeleteDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteOwner,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['owners'] });
      toast.success('Владелец успешно удален');
      handleToggleOpen();
    },
    onError: async () => {
      toast.error('Ошибка при удалении владельца');
    },
  });

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <>
      <IconButton aria-label="delete" color="error" onClick={handleToggleOpen}>
        <Delete />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleToggleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: 'flex', alignItems: 'center', pt: 3 }}
        >
          <Delete sx={{ mr: 1 }} fontSize="large" color="error" />
          <Typography variant="h6">
            Вы действительно хотите удалить владельца?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleToggleOpen} variant="contained">
            Отмена
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={handleDelete}
            autoFocus
            color="inherit"
            sx={{ ':hover': { bgcolor: '#d32f2f', color: '#fff' }, px: 2 }}
          >
            Удалить
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OwnerDeleteDialog;
