import React from 'react';
import { Typography, Container, Paper, Box, Grid } from '@mui/material';
import ChatBotPromptManager from './components/ChatBotPromptManager';

const ChatManagement = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          チャット関連管理
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ChatBotPromptManager />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ChatManagement;