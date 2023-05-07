import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = (): JSX.Element => {
  return (
    <Link to="/">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 2,
          mr: 4,
          marginRight: 0,
          marginLeft: 0,
        }}
      >
        {/* <img src={LogoSvg} alt="Core reports logo" width={48} /> */}
        <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
          АИС Ветеринарная клиника
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
