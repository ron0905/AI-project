import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Group as GroupIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { IdolGroup } from '../../types/types';

const rankConfig = {
  SS: { color: '#DAA520', label: 'エリートグループ', maxRanking: 3 },
  S: { color: '#8C8C8C', label: 'レギュラーグループ', maxRanking: 10 },
  A: { color: '#DC143C', label: 'ルーキーグループ', maxRanking: 50 },
  B: { color: '#4169E1', label: '研修生グループ', maxRanking: 100 },
  C: { color: '#2E8B57', label: '認定グループ', maxRanking: 1000 },
  D: { color: '#696969', label: '一般グループ', maxRanking: Infinity },
  E: { color: '#A9A9A9', label: '作成中グループ', maxRanking: Infinity }
};

const GroupManagementView: React.FC = () => {
  // 仮のデータ
  const [groups] = useState<IdolGroup[]>([
    {
      id: '1',
      name: '桜色スターライト',
      imageUrl: '/group-placeholder.png',
      status: 'active',
      description: 'ポップスを中心としたアイドルグループ',
      memberCount: 5,
      debutDate: '2023-12-01',
      concept: 'サイバーパンク風の近未来的アイドル',
      rank: 'SS',
      rankPoints: 1500,
      ranking: 1
    },
    {
      id: '2',
      name: '虹色プリズム',
      imageUrl: '/group-placeholder.png',
      status: 'active',
      description: 'エレクトロポップがメインのグループ',
      memberCount: 4,
      debutDate: '2023-12-15',
      concept: 'サイバークイーン',
      rank: 'SS',
      rankPoints: 1450,
      ranking: 2
    },
    {
      id: '3',
      name: '夢見るシンフォニア',
      imageUrl: '/group-placeholder.png',
      status: 'active',
      description: 'ハーモニーを重視した次世代アイドル',
      memberCount: 6,
      debutDate: '2023-11-01',
      concept: 'デジタルハーモニー',
      rank: 'S',
      rankPoints: 1200,
      ranking: 5
    },
    {
      id: '4',
      name: 'ミライメロディ',
      imageUrl: '/group-placeholder.png',
      status: 'active',
      description: 'アイドルテクノポップユニット',
      memberCount: 3,
      debutDate: '2024-01-15',
      concept: 'バイナリーコード',
      rank: 'A',
      rankPoints: 950,
      ranking: 25
    },
    {
      id: '5',
      name: 'デジタルドリーム',
      imageUrl: '/group-placeholder.png',
      status: 'active',
      description: '8ビット風サウンドを取り入れたユニット',
      memberCount: 4,
      debutDate: '2024-02-01',
      concept: 'レトロゲーム',
      rank: 'B',
      rankPoints: 650,
      ranking: 75
    },
    {
      id: '6',
      name: '天使のキャンバス',
      imageUrl: '/group-placeholder.png',
      status: 'active',
      description: '癒し系アイドルユニット',
      memberCount: 3,
      debutDate: '2024-02-15',
      concept: '天使をモチーフ',
      rank: 'C',
      rankPoints: 350,
      ranking: 250
    },
    {
      id: '7',
      name: '星空のシンフォニー',
      imageUrl: '/group-placeholder.png',
      status: 'inactive',
      description: '結成準備中の期待の新人グループ',
      memberCount: 5,
      debutDate: '-',
      concept: '未来型アイドル',
      rank: 'E',
      rankPoints: 0,
      ranking: 0
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h6">アイドルグループ一覧</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          新規グループ作成
        </Button>
      </div>

      <Grid container spacing={3}>
        {groups.map(group => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={group.imageUrl}
                alt={group.name}
                className="object-cover"
              />
              <CardContent>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <Typography variant="h6" component="div">
                      {group.name}
                    </Typography>
                    <Chip
                      icon={<StarIcon />}
                      label={group.rank === 'E' ? 
                        `${group.rank} (作成中)` : 
                        `${group.rank} (${group.ranking}位)`
                      }
                      size="small"
                      sx={{
                        ml: 1,
                        backgroundColor: rankConfig[group.rank].color,
                        color: 'white',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                  </div>
                  <Chip
                    label={group.status === 'active' ? '公開中' : '非公開'}
                    color={group.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </div>
                <Typography variant="caption" color="text.secondary" display="block">
                  {rankConfig[group.rank].label}
                </Typography>
                <div className="mb-2">
                  <Chip
                    icon={<GroupIcon />}
                    label={`${group.memberCount}人`}
                    size="small"
                    className="mr-2"
                  />
                  <Chip
                    label={`デビュー: ${group.debutDate}`}
                    size="small"
                  />
                </div>
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  {group.description}
                </Typography>
                <div className="flex justify-end space-x-1">
                  <IconButton size="small">
                    {group.status === 'active' ? 
                      <VisibilityIcon /> : 
                      <VisibilityOffIcon />
                    }
                  </IconButton>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GroupManagementView; 