import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
  IdolRankDistribution,
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
          <IdolRankDistribution 
            data={dashboardData.idols} 
            groups={dashboardData.groups}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GroupRankDistribution data={dashboardData.groups} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ActivityMetrics data={dashboardData.activities} />
        </Grid>

        <Grid item xs={12} md={6}>
          <FanDemographics data={dashboardData.fans} />
        </Grid>

        <Grid item xs={12} md={6}>
          <RevenueAnalysis data={dashboardData.revenue} />
        </Grid>
      </Grid>
    </div>
  );
};