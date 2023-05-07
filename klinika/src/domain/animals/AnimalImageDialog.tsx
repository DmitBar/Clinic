import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Animal } from '..';
import { baseURL } from '../../utils/axios';

interface AnimalImageDialogProps {
  open: boolean;
  animal: Animal | null;

  onClose(): void;
}

const AnimalImageDialog = ({
  open,
  animal,
  onClose,
}: AnimalImageDialogProps) => {
  const handleToggleDialog = () => {
    onClose();
  };

  if (!animal) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="xs">
        <DialogTitle sx={{ p: 3 }}>
          <Typography align="center">Фото</Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <img src={`${baseURL}${animal?.image}`} alt="" />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default AnimalImageDialog;
