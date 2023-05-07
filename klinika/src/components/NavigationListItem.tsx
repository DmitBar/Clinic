import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { type NavigationItem } from '../domain/navigations';

interface NavigationListItemProps {
  item: NavigationItem;
}

const NavigationListItem = ({ item }: NavigationListItemProps): JSX.Element => {
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  const handleClick = (): void => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          minHeight: 48,
          justifyContent: 'initial',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: 'center',
          }}
        >
          {item?.icon !== undefined && <item.icon />}
        </ListItemIcon>
        <ListItemText primary={item.name} sx={{ opacity: 1 }} />

        {collapseOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
      </ListItemButton>

      {item.children !== undefined && item.children?.length !== 0 && (
        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          {item.children.map((child, index) => (
            <>
              <NavLink to={item.path + child.path} key={index}>
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
                      <ListItemText sx={{ ml: 6 }} primary={child.name} />
                    </ListItemButton>
                  </List>
                )}
              </NavLink>
            </>
          ))}
        </Collapse>
      )}
    </ListItem>
    
  );
};

export default NavigationListItem;
