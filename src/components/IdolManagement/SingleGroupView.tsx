import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { rankConfig, GroupRank } from '../../types/types';

interface IdolData {
  id: string;
  name: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  description: string;
  voiceModel: string;
  personality: string;
  activities: string[];
  specialSkills: string[];
  birthDate: string;
  birthPlace: string;
  height: number;
  nickname: string;
  zodiacSign: string;
  bloodType: string;
  hobbies: string[];
  memberColor: string;
  position: string;
  customPrompt: string;
  rank: GroupRank;
  rankPoints: number;
  formationDate: string;
  debutDate: string;
  concept: string;
  ranking: number;
}

const voiceModels = [
  { id: 'voice-model-1', label: 'ボイスモデル 1 (明るい声質)' },
  { id: 'voice-model-2', label: 'ボイスモデル 2 (落ち着いた声質)' },
  { id: 'voice-model-3', label: 'ボイスモデル 3 (かわいい声質)' },
  { id: 'voice-model-4', label: 'ボイスモデル 4 (クール声質)' },
  { id: 'voice-model-5', label: 'ボイスモデル 5 (元気な声質)' }
];

const calculateNextRankPoints = (currentRank: GroupRank, currentPoints: number): number => {
  const rankPoints: Record<GroupRank, number> = {
    'E': 500,
    'D': 800,
    'C': 1000,
    'B': 1200,
    'A': 1400,
    'S': 1600,
    'SS': 2000
  };

  const ranks: GroupRank[] = ['E', 'D', 'C', 'B', 'A', 'S', 'SS'];
  const currentRankIndex = ranks.indexOf(currentRank);
  
  if (currentRankIndex === ranks.length - 1) {
    return 0; // 最高ランクの場合は0を返す
  }
  
  const nextRank = ranks[currentRankIndex + 1];
  return rankPoints[nextRank] - currentPoints;
};

const zodiacSigns = [
  '牡羊座', '牡牛座', '双子座', '蟹座', 
  '獅子座', '乙女座', '天秤座', '蠍座',
  '射手座', '山羊座', '水瓶座', '魚座'
];

const bloodTypes = ['A', 'B', 'O', 'AB'];

const SingleGroupView: React.FC<{ idolId: string; onBack: () => void }> = ({ idolId, onBack }) => {
  const [idolData, setIdolData] = useState<IdolData>({
    id: idolId,
    name: '桜井 ひより',
    imageUrl: '/idol-placeholder.png',
    status: 'active',
    description: '虹色プリズムのセンターを務める次世代型バーチャルアイドル',
    voiceModel: 'voice-model-3',
    personality: '明るく前向きで努力家',
    activities: [
      'バーチャルライブ配信',
      'SNSでのファン交流',
      'オリジナル楽曲配信',
      'アイドルラジオ配信',
      'ファンミーティング'
    ],
    specialSkills: ['ダンス', 'ピアノ', '作詞'],
    birthDate: '2006-04-03',
    birthPlace: '東京都渋谷区',
    height: 156,
    nickname: 'ひよりん',
    zodiacSign: '牡羊座',
    bloodType: 'O',
    hobbies: ['カラオケ', 'ファッション', 'お菓子作り'],
    memberColor: '#FF9ECD',
    position: 'select',
    customPrompt: '',
    rank: 'SS',
    rankPoints: 1450,
    formationDate: '2023-09-01',
    debutDate: '2023-12-15',
    concept: '7色の個性が織りなす、次世代型バーチャルアイドルグループ',
    ranking: 2
  });

  const [isEditingActivities, setIsEditingActivities] = useState(false);
  const [editingActivities, setEditingActivities] = useState<string[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);

  const handleEditActivities = () => {
    setEditingActivities([...idolData.activities]);
    setIsEditingActivities(true);
  };

  const handleCloseActivities = () => {
    setIsEditingActivities(false);
  };

  const handleSaveActivities = () => {
    setIdolData({
      ...idolData,
      activities: editingActivities
    });
    setIsEditingActivities(false);
  };

  return (
    <div className="space-y-6">
      <Paper elevation={1} className="p-6">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Typography variant="h4">虹色プリズム</Typography>
                <Chip
                  icon={<StarIcon />}
                  label={`${idolData.rank} (${idolData.ranking}位)`}
                  size="medium"
                  sx={{
                    backgroundColor: rankConfig[idolData.rank].color,
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: 'white'
                    }
                  }}
                />
              </div>
              
              <div>
                <Typography variant="subtitle2" color="text.secondary">コンセプト</Typography>
                <Typography variant="body1">{idolData.concept}</Typography>
              </div>

              <div>
                <Typography variant="subtitle2" color="text.secondary">活動内容</Typography>
                <div className="flex flex-wrap gap-2 mt-1">
                  {idolData.activities.map((activity, index) => (
                    <Chip key={index} label={activity} size="small" />
                  ))}
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div className="space-y-4">
              <div>
                <Typography variant="subtitle2" color="text.secondary">ランクポイント</Typography>
                <Typography variant="h6">{idolData.rankPoints} pt</Typography>
                <Typography variant="caption">
                  次のランクまで: {calculateNextRankPoints(idolData.rank, idolData.rankPoints)} pt
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle2" color="text.secondary">結成日</Typography>
                <Typography variant="body1">{idolData.formationDate || '未設定'}</Typography>
              </div>

              <div>
                <Typography variant="subtitle2" color="text.secondary">デビュー日</Typography>
                <Typography variant="body1">{idolData.debutDate || '未定'}</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <div className="flex items-center mb-4">
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">アイドル情報編集</Typography>
      </div>

      <Paper elevation={1} className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Typography variant="subtitle2" color="primary">
            メンバー一覧
          </Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
          >
            メンバー追加
          </Button>
        </div>
        <Grid container spacing={2}>
          {[...Array(7)].map((_, index) => (
            <Grid item key={index}>
              <div 
                className="relative cursor-pointer"
                onClick={() => setSelectedMemberId(index)}
              >
                <Avatar
                  src={`/member-placeholder-${index + 1}.png`}
                  sx={{
                    width: 64,
                    height: 64,
                    border: '3px solid',
                    borderColor: index === selectedMemberId ? '#FF9ECD' : '#e0e0e0',
                    transition: 'border-color 0.2s ease',
                    '&:hover': {
                      borderColor: '#FFB6D9'
                    }
                  }}
                />
                <Typography
                  variant="caption"
                  align="center"
                  display="block"
                  sx={{ 
                    mt: 1,
                    color: index === selectedMemberId ? 'primary.main' : 'text.primary'
                  }}
                >
                  {index === 0 ? '桜井 ひより' : `メンバー${index + 1}`}
                </Typography>
                <Chip
                  label={index === 0 ? 'センター' : ''}
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    visibility: index === 0 ? 'visible' : 'hidden',
                    minWidth: '70px'
                  }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {selectedMemberId === 0 ? (
        <Paper elevation={1} className="p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <Typography variant="subtitle2" color="primary">
              プロフィール情報
            </Typography>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={handleEditActivities}
            >
              編集
            </Button>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className="space-y-3">
                <FormControl required fullWidth size="small">
                  <InputLabel>星座</InputLabel>
                  <Select
                    value={idolData.zodiacSign}
                    label="星座"
                    onChange={(e) => setIdolData({...idolData, zodiacSign: e.target.value})}
                  >
                    {zodiacSigns.map((sign) => (
                      <MenuItem key={sign} value={sign}>{sign}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required fullWidth size="small">
                  <InputLabel>血液型</InputLabel>
                  <Select
                    value={idolData.bloodType}
                    label="血液型"
                    onChange={(e) => setIdolData({...idolData, bloodType: e.target.value})}
                  >
                    {bloodTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}型</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="flex space-x-2">
                  <TextField
                    required
                    fullWidth
                    label="趣味"
                    value={idolData.hobbies.join(', ')}
                    size="small"
                    onChange={(e) => setIdolData({...idolData, hobbies: e.target.value.split(', ')})}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => console.log('Generate AI hobbies')}
                  >
                    AI生成
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <TextField
                    required
                    fullWidth
                    label="特技"
                    value={idolData.specialSkills.join(', ')}
                    size="small"
                    onChange={(e) => setIdolData({...idolData, specialSkills: e.target.value.split(', ')})}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => console.log('Generate AI special skills')}
                  >
                    AI生成
                  </Button>
                </div>
                <FormControl required fullWidth size="small">
                  <InputLabel>ボイスモデル</InputLabel>
                  <Select
                    value={idolData.voiceModel}
                    label="ボイスモデル"
                    onChange={(e) => setIdolData({...idolData, voiceModel: e.target.value})}
                  >
                    {voiceModels.map((model) => (
                      <MenuItem key={model.id} value={model.id}>{model.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="flex space-x-2">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      console.log('Voice test for:', idolData.voiceModel);
                    }}
                  >
                    ボイステスト
                  </Button>
                  <TextField
                    size="small"
                    placeholder="テストする文章を入力"
                    sx={{ flexGrow: 1 }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="space-y-3">
                <TextField
                  fullWidth
                  label="メンバーカラー"
                  value={idolData.memberColor}
                  size="small"
                  type="color"
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: idolData.memberColor,
                          marginRight: 1
                        }}
                      />
                    )
                  }}
                  onChange={(e) => setIdolData({...idolData, memberColor: e.target.value})}
                />
                <FormControl fullWidth size="small">
                  <InputLabel>ポジション</InputLabel>
                  <Select
                    value={idolData.position}
                    label="ポジション"
                    onChange={(e) => setIdolData({...idolData, position: e.target.value})}
                  >
                    <MenuItem value="select">選抜メンバー</MenuItem>
                    <MenuItem value="under">アンダーメンバー</MenuItem>
                  </Select>
                </FormControl>
                <div className="space-y-2">
                  <TextField
                    fullWidth
                    label="自由記入欄"
                    value={idolData.customPrompt}
                    multiline
                    rows={4}
                    onChange={(e) => setIdolData({...idolData, customPrompt: e.target.value})}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => console.log('Generate AI custom prompt')}
                  >
                    AI生成
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper elevation={1} className="p-4 mb-4">
          <Typography variant="body1" color="text.secondary" align="center">
            このメンバーの情報はまだ設定されていません
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            startIcon={<EditIcon />}
          >
            メンバー情報を設定する
          </Button>
        </Paper>
      )}

      <Paper elevation={1} className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Typography variant="subtitle2" color="primary">
            個人活動
          </Typography>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEditActivities}
          >
            編集
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {idolData.activities.map((activity, index) => (
            <Chip
              key={index}
              label={activity}
              size="small"
              sx={{
                height: '28px',
                '& .MuiChip-label': {
                  px: 1.5
                }
              }}
            />
          ))}
        </div>
      </Paper>

      <Dialog
        open={isEditingActivities}
        onClose={handleCloseActivities}
        maxWidth="sm"
        fullWidth
      >
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">活動内容の編集</Typography>
              <IconButton onClick={handleCloseActivities}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="space-y-3">
              {editingActivities.map((activity, index) => (
                <div key={index} className="flex space-x-2">
                  <TextField
                    fullWidth
                    size="small"
                    value={activity}
                    onChange={(e) => {
                      const newActivities = [...editingActivities];
                      newActivities[index] = e.target.value;
                      setEditingActivities(newActivities);
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      const newActivities = editingActivities.filter((_, i) => i !== index);
                      setEditingActivities(newActivities);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setEditingActivities([...editingActivities, ''])}
              >
                活動を追加
              </Button>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={handleCloseActivities}>
                キャンセル
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveActivities}
              >
                保存
              </Button>
            </div>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
};

export default SingleGroupView; 