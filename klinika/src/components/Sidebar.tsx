import React from 'react';
import {
  List,
  Toolbar,
  Box,
  Drawer,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import navigationItems from '../domain/navigations';
import NavigationListItem from './NavigationListItem';
import { NavLink } from 'react-router-dom';
import { localStorageManager } from '../utils/localStorageManager';
import { parseJwt } from '../utils';

const Sidebar = (): JSX.Element => {
  const token = localStorageManager.getItem('token');
  let role = '';
  if (token) {
    role =
      parseJwt(token)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] ?? false;
  }

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 250,
          boxSizing: 'border-box',
          overflow: 'hidden',
        },
      }}
    >
      <Toolbar />
      <Box width={250} sx={{ overflow: 'auto' }}>
        <List color="secondary">
          {navigationItems.map((item, index) => (
            <NavigationListItem key={index} item={item} />
          ))}
          {token && role === 'Registrar' && (
            <NavLink to={'/register'}>
              {({ isActive }) => (
                <List
                  component="div"
                  disablePadding
                  sx={
                    isActive
                      ? {
                          backgroundColor: '#3292f0',
                          color: '#fff',
                        }
                      : {}
                  }
                >
                  <ListItemButton>
                    <ListItemText sx={{ ml: 4 }} primary={'Регистрация'} />
                  </ListItemButton>
                </List>
              )}
            </NavLink>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
