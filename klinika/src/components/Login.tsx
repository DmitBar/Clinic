import { Box } from '@mui/material';
import { LoginForm } from './LoginForm/LoginForm';
import { Navigate } from 'react-router-dom';
import { localStorageManager } from '../utils/localStorageManager';

export const Login = () => {
  const token = localStorageManager.getItem('token');
  return token ? (
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
      <LoginForm />
    </Box>
  );
};
