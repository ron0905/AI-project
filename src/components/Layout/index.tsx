import React from 'react';
import { Box } from '@mui/material';
import { Navigation } from './Navigation';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}; 