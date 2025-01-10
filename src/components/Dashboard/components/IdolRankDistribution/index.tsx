import React from 'react';
import { Box, Typography, Tooltip, Avatar } from '@mui/material';
import { DashboardMetrics } from '../../../../types/dashboard';
import { DashboardCard, DashboardCardTitle } from '../styles/common';
import { rankConfig } from '../../../../utils/constants';
import { GroupRank } from '../../../../types/types';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

type Props = {
  data: DashboardMetrics['idols'];
  groups: DashboardMetrics['groups'];
}

type IdolWithGroup = {
  id: string;
  name: string;
  imageUrl: string;
  rank: GroupRank;
  ranking: number;
  groupId?: string;
}

export const IdolRankDistribution: React.FC<Props> = ({ data, groups }) => {
  const getRankColor = (rank: string) => {
    return rankConfig[rank as keyof typeof rankConfig]?.color || '#gray';
  };

  // グループごとの色を定義（より控えめな色に調整）
  const groupColors = {
    '1': 'rgba(255, 192, 203, 0.6)', // 桜色スターライト: 薄いピンク
    '2': 'rgba(255, 223, 0, 0.6)'    // 虹色プリズム: 薄い黄色
  };

  // アイドルとグループの関連付け（仮のデータ）
  const idolsWithGroups: IdolWithGroup[] = data.ownedIdols.map(idol => ({
    ...idol,
    groupId: idol.ranking <= 200 ? '1' : '2' // 仮の割り当て：ランキング200位以内は桜色スターライト、それ以外は虹色プリズム
  }));

  const groupedIdols = idolsWithGroups.reduce((acc, idol) => {
    if (!acc[idol.rank]) {
      acc[idol.rank] = [];
    }
    acc[idol.rank].push(idol);
    return acc;
  }, {} as Record<GroupRank, typeof idolsWithGroups>);

  const getGroupName = (groupId?: string) => {
    return groups.ownedGroups.find(g => g.id === groupId)?.name || '無所属';
  };

  return (
    <DashboardCard>
      <DashboardCardTitle variant="h6" className="flex items-center gap-2">
        <EmojiEventsIcon />
        プラットフォームランキング
      </DashboardCardTitle>

      <Box className="flex flex-wrap gap-2">
        {Object.entries(rankConfig).map(([rank, config]) => {
          const idols = groupedIdols[rank as GroupRank] || [];

          return (
            <Box 
              key={rank} 
              className="p-2 bg-gray-50 rounded-lg"
              sx={{ 
                flex: '1 1 250px',
                minWidth: '250px',
                maxWidth: '400px'
              }}
            >
              <Box 
                className="flex items-center gap-2 mb-2"
                sx={{ color: config.color }}
              >
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: config.color 
                  }} 
                />
                <Typography variant="subtitle2" sx={{ color: 'inherit' }}>
                  {rank}ランク
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ color: 'text.secondary' }}
                  className="ml-auto"
                >
                  {data.rankingCriteria[rank as GroupRank].min}位 
                  ~ 
                  {data.rankingCriteria[rank as GroupRank].max === Infinity 
                    ? '∞' 
                    : `${data.rankingCriteria[rank as GroupRank].max}位`}
                </Typography>
              </Box>

              <Box className="flex flex-wrap gap-2 min-h-[48px] items-center">
                {idols.length > 0 ? (
                  idols.map((idol) => (
                    <Tooltip
                      key={idol.id}
                      title={`${idol.name} (${idol.ranking}位) - ${getGroupName(idol.groupId)}`}
                      arrow
                    >
                      <Box className="relative">
                        <Box
                          className="absolute inset-0 rounded-full"
                          sx={{
                            backgroundColor: idol.groupId ? groupColors[idol.groupId as keyof typeof groupColors] : 'transparent',
                            transform: 'scale(1.2)',
                            zIndex: 0
                          }}
                        />
                        <Avatar
                          src={idol.imageUrl}
                          alt={idol.name}
                          sx={{ 
                            width: 40, 
                            height: 40,
                            position: 'relative',
                            zIndex: 1
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            bottom: -6,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '0 4px',
                            borderRadius: 1,
                            fontSize: '0.6rem',
                            minWidth: '24px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            zIndex: 2
                          }}
                        >
                          {idol.ranking}位
                        </Typography>
                      </Box>
                    </Tooltip>
                  ))
                ) : (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    className="italic text-sm"
                  >
                    このランクのアイドルはいません
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* グループ凡例 */}
      <Box className="mt-4 flex gap-4 justify-end">
        {groups.ownedGroups.map(group => (
          <Box key={group.id} className="flex items-center gap-2">
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: groupColors[group.id as keyof typeof groupColors]
              }}
            />
            <Typography variant="caption">
              {group.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </DashboardCard>
  );
}; 