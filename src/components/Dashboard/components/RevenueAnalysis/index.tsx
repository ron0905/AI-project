import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DashboardMetrics } from '../../../../types/dashboard';
import { DashboardCard, DashboardCardTitle } from '../styles/common';

interface Props {
  data: DashboardMetrics['revenue'];
}

export const RevenueAnalysis: React.FC<Props> = ({ data }) => {
  return (
    <DashboardCard>
      <DashboardCardTitle variant="h6">
        収益分析
      </DashboardCardTitle>

      <Box className="mb-4 p-4 bg-gray-50 rounded-lg">
        <Typography variant="h4" color="primary">
          ¥{data.total.toLocaleString()}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          総収益
        </Typography>
      </Box>

      <Typography variant="subtitle2" gutterBottom>
        収益内訳
      </Typography>
      
      {Object.entries(data.breakdown).map(([category, amount]) => (
        <Box key={category} className="mb-2">
          <Box className="flex justify-between mb-1">
            <Typography variant="body2">
              {category === 'subscription' ? 'サブスクリプション' :
               category === 'virtualLive' ? 'バーチャルライブ' :
               category === 'merchandise' ? 'グッズ販売' :
               category === 'fanMeeting' ? 'ファンミーティング' : 'その他'}
            </Typography>
            <Typography variant="body2">
              ¥{amount.toLocaleString()}
            </Typography>
          </Box>
          <Box className="w-full h-2 bg-gray-100 rounded">
            <Box
              className="h-full rounded"
              sx={{
                width: `${(amount / data.total) * 100}%`,
                bgcolor: 'primary.main'
              }}
            />
          </Box>
        </Box>
      ))}

      <Typography variant="subtitle2" className="mt-4 mb-2">
        月間推移
      </Typography>
      {data.monthlyTrend.map((month, index) => (
        <Box key={index} className="mb-2">
          <Typography variant="caption">
            {month.month}
          </Typography>
          <Typography variant="body1">
            ¥{month.amount.toLocaleString()}
          </Typography>
        </Box>
      ))}
    </DashboardCard>
  );
}; 