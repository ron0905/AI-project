import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const SiteManagement = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          サイト関連管理
        </Typography>
      </Paper>
    </Container>
  );
};

export default SiteManagement;
