import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import type { ChatAnalytics as ChatAnalyticsType } from '../../../../../types/chat';

const ChatAnalytics: React.FC = () => {
  const analyticsData: ChatAnalyticsType = {
    totalChats: 15000,
    averageResponseTime: 1.5,
    dailyActiveUsers: 2500,
    popularTopics: [
      { topic: "新曲について", count: 450 },
      { topic: "ライブ情報", count: 380 },
      { topic: "メンバーの趣味", count: 320 }
    ],
    userSatisfaction: 85
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        チャット分析
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                チャット統計
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  総チャット数
                </Typography>
                <Typography variant="h4">
                  {analyticsData.totalChats.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatAnalytics;
