import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
  GroupRankDistribution,
  ActivityMetrics,
  FanDemographics,
  RevenueAnalysis
} from './components';
import { dashboardData } from './data/dashboardData';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h5" className="mb-6">
        AIアイドルマネジメントダッシュボード
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <GroupRankDistribution data={dashboardData.groups} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <ActivityMetrics data={dashboardData.activities} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <FanDemographics data={dashboardData.fans} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <RevenueAnalysis data={dashboardData.revenue} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}; 