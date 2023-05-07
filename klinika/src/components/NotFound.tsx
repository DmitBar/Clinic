import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export const NotFound = (): JSX.Element => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column">
            <Typography variant="h1" color="success.primary">
                404
            </Typography>
            <Typography variant="h3" color="success.primary" mt={4}>
                Page not found
            </Typography>
            <Button variant="contained" href="/" color="primary" sx={{ mt: 4 }}>
                Go to home
            </Button>
        </Box>
    );
};
