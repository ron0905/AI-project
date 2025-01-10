import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'white'
      }}
    >
      <Toolbar sx={{ height: '64px' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/A-idol_logo-and-text.png"
            alt="A-idol Logo"
            style={{
              height: '48px',
              width: 'auto',
              maxWidth: '240px',
              objectFit: 'contain'
            }}
          />
        </Box>
        <IconButton 
          size="large"
          sx={{ 
            mr: 2,
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <NotificationsIcon sx={{ color: 'text.secondary' }} />
        </IconButton>
        <IconButton 
          size="large"
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <AccountCircleIcon sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
