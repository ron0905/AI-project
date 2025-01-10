import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DashboardMetrics } from '../../../../types/dashboard';
import { DashboardCard, DashboardCardTitle } from '../styles/common';
import { MusicNote, LiveTv, Group, Article } from '@mui/icons-material';

interface Props {
  data: DashboardMetrics['activities'];
}

export const ActivityMetrics: React.FC<Props> = ({ data }) => {
  const metrics = [
    { icon: <MusicNote />, label: '楽曲数', value: data.totalSongs },
    { icon: <LiveTv />, label: 'ライブ数', value: data.totalLives },
    { icon: <Group />, label: 'ファンミ数', value: data.totalFanMeetings },
    { icon: <Article />, label: '投稿数', value: data.totalPosts }
  ];

  return (
    <DashboardCard>
      <DashboardCardTitle variant="h6">
        活動分析
      </DashboardCardTitle>

      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={6} key={index}>
            <Box className="p-3 bg-gray-50 rounded-lg text-center">
              <Box className="flex justify-center mb-2 text-primary">
                {metric.icon}
              </Box>
              <Typography variant="h5" color="primary">
                {metric.value}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {metric.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="mt-4">
        <Typography variant="subtitle2" gutterBottom>
          月間活動推移
        </Typography>
        {data.monthlyActivities.map((month, index) => (
          <Box key={index} className="mb-2">
            <Typography variant="caption">
              {month.month}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Box className="text-center p-1 bg-blue-50 rounded">
                  {month.songs}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className="text-center p-1 bg-green-50 rounded">
                  {month.lives}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className="text-center p-1 bg-yellow-50 rounded">
                  {month.fanMeetings}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className="text-center p-1 bg-red-50 rounded">
                  {month.posts}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </DashboardCard>
  );
}; 