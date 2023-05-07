import React, { useEffect } from 'react';
import {
  Box,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Sidebar from '../Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { PaletteModeTypes, getDesignTokens } from '../../theme/theme';
import { getThemeMode } from '../../utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ColorModeContext from '../../context/ColorModeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { localStorageManager } from '../../utils/localStorageManager';

const Layout = (): JSX.Element => {
  const client = new QueryClient();

  const defaultMode =
    (localStorage.getItem('mode') as PaletteMode) || PaletteModeTypes.light;

  const [mode, setMode] = React.useState<PaletteMode>(defaultMode);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = (
            prevMode === PaletteModeTypes.light
              ? PaletteModeTypes.dark
              : PaletteModeTypes.light
          ) as PaletteMode;

          localStorage.setItem('mode', newMode);

          return newMode;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorageManager.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme.palette.mode}
        />
        <QueryClientProvider client={client}>
          <Box
            display="flex"
            flexDirection="row"
            sx={{
              backgroundColor:
                getThemeMode() === PaletteModeTypes.light ? '#eef2f6' : '',
              minHeight: '100vh',
            }}
          >
            <Header />

            <Sidebar />

            <Box
              component="main"
              sx={{
                flex: 1,
                p: 3,
                margin: '80px 16px 0 16px',
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
