import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const ContentManagement = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          コンテンツ管理
        </Typography>
      </Paper>
    </Container>
  );
};

export default ContentManagement;
