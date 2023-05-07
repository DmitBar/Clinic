import {
  AccountCircle,
  Brightness4,
  Brightness7,
  ExpandMore,
  Language,
  Logout,
  VerifiedUser,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ColorModeContext from '../context/ColorModeContext';
import { PaletteModeTypes } from '../theme/theme';
import { getThemeMode } from '../utils';
import Logo from './Logo';
import { localStorageManager } from '../utils/localStorageManager';
import { parseJwt } from '../utils';
import { toast } from 'react-toastify';

const Header = (): JSX.Element => {
  const themeMode = getThemeMode();
  const colorMode = React.useContext(ColorModeContext);

  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorageManager.getItem('token');

    if (!token) {
      return;
    }

    setRole(
      parseJwt(token)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] ?? 'Неизвестно'
    );
  }, []);

  const handleLogout = (): void => {
    localStorageManager.removeItem('token');
    navigate('/login');
    toast.success('Вы успешно вышли из системы');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
      }}
      color="primary"
    >
      <Toolbar
        disableGutters
        sx={{
          pr: '24px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Logo />

        <Box sx={{ display: 'flex' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              mr: 3,
            }}
          >
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {themeMode === PaletteModeTypes.dark ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>

            <IconButton sx={{ ml: 1 }} onClick={handleLogout} color="inherit">
              <Logout />
            </IconButton>
          </Stack>

          <Button
            aria-controls="menu"
            aria-haspopup="true"
            size="large"
            color="inherit"
            sx={{
              fontWeight: '400',
              fontSize: '1.2rem',
              textTransform: 'none',
              px: 0,
            }}
            style={{
              textTransform: 'capitalize',
            }}
          >
            <AccountCircle sx={{ mr: 1 }} />
            {role}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
