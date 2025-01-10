import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DashboardMetrics } from '../../../../types/dashboard';
import { DashboardCard, DashboardCardTitle } from '../styles/common';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface Props {
  data: DashboardMetrics['fans'];
}

export const FanDemographics: React.FC<Props> = ({ data }) => {
  return (
    <DashboardCard>
      <DashboardCardTitle variant="h6">
        ファン動向分析
      </DashboardCardTitle>

      <Box className="mb-4 p-4 bg-gray-50 rounded-lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4" color="primary">
              {data.total.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              総ファン数
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box className="flex items-center">
              <TrendingUpIcon color="success" />
              <Typography variant="h4" color="success.main" className="ml-1">
                {data.monthlyGrowth.toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary">
              月間増加数
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="subtitle2" gutterBottom>
        ファン属性
      </Typography>
      
      <Grid container spacing={2}>
        {Object.entries(data.demographics).map(([category, distribution]) => (
          <Grid item xs={12} key={category}>
            <Typography variant="caption" color="textSecondary">
              {category === 'age' ? '年齢層' : 
               category === 'gender' ? '性別' : '地域'}
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {Object.entries(distribution).map(([key, value]) => (
                <Box
                  key={key}
                  className="flex-1 min-w-[100px] p-2 bg-gray-50 rounded text-center"
                >
                  <Typography variant="body2">
                    {key}: {value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
}; 