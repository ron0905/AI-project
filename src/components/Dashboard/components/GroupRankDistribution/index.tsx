import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { DashboardMetrics } from '../../../../types/dashboard';
import { DashboardCard, DashboardCardTitle } from '../styles/common';
import { rankConfig } from '../../../../utils/constants';
import { GroupRank } from '../../../../types/types';
import Groups from '@mui/icons-material/Groups';

type Props = {
  data: DashboardMetrics['groups'];
}

export const GroupRankDistribution: React.FC<Props> = ({ data }) => {
  const getRankColor = (rank: string) => {
    return rankConfig[rank as keyof typeof rankConfig]?.color || '#gray';
  };

  // グループごとの色を定義（アイドルランキングと同じ色を使用）
  const groupColors = {
    '1': 'rgba(255, 192, 203, 0.6)', // 桜色スターライト: 薄いピンク
    '2': 'rgba(255, 223, 0, 0.6)'    // 虹色プリズム: 薄い黄色
  };

  return (
    <DashboardCard>
      <DashboardCardTitle variant="h6" className="flex items-center gap-2 mb-4">
        <Groups />
        グループランキング
      </DashboardCardTitle>

      <Box className="space-y-3">
        {data.ownedGroups.map((group) => {
          const rankColor = getRankColor(group.rank);
          
          return (
            <Box 
              key={group.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <Box className="relative">
                <Box
                  className="absolute inset-0 rounded-full"
                  sx={{
                    backgroundColor: groupColors[group.id as keyof typeof groupColors],
                    transform: 'scale(1.2)',
                    zIndex: 0
                  }}
                />
                <Avatar
                  src={group.imageUrl}
                  alt={group.name}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </Box>
              <Box className="flex-grow min-w-0">
                <Typography variant="subtitle1" className="font-bold truncate">
                  {group.name}
                </Typography>
                <Box className="flex items-center gap-2">
                  <Typography 
                    variant="caption" 
                    sx={{ color: rankColor }}
                    className="font-bold"
                  >
                    {group.rank}ランク
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                  >
                    メンバー{group.memberCount}人
                  </Typography>
                </Box>
              </Box>
              <Box className="text-right">
                <Typography variant="h6" color="primary" className="font-bold">
                  {group.ranking}
                  <Typography 
                    component="span" 
                    variant="caption" 
                    color="text.secondary"
                    className="ml-1"
                  >
                    位
                  </Typography>
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                >
                  /{data.totalPlatformGroups.toLocaleString()}グループ中
                </Typography>
              </Box>
            </Box>
          );
        })}

        {data.ownedGroups.length < 3 && (
          <Box className="p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <Typography 
              color="text.secondary" 
              className="text-center"
            >
              {data.ownedGroups.length === 0 
                ? "無料枠でグループを作成できます" 
                : "有料プランで追加のグループを作成できます"}
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardCard>
  );
};
