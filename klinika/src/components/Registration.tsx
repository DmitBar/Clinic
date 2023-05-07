import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { localStorageManager } from '../utils/localStorageManager';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

export const Registration = () => {
  const token = localStorageManager.getItem('token');
  return !token ? (
    <Navigate to="/" />
  ) : (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RegistrationForm />
    </Box>
  );
};
