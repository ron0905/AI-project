import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  AutoFixHigh as AutoFixHighIcon
} from '@mui/icons-material';
import type { ChatBotPrompt } from '../../../../../types/chat';
import ChatBotTester from '../ChatBotTester/index';

const PromptField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}> = ({ label, value, onChange, helperText, multiline = false, rows = 1, placeholder }) => (
  <>
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      InputProps={{
        placeholder: placeholder,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        '& .MuiInputBase-input::placeholder': {
          color: 'text.secondary',
          opacity: 1
        }
      }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AutoFixHighIcon />}
        onClick={() => console.log(`Generate AI ${label}`)}
      >
        AI生成
      </Button>
    </Box>
  </>
);

const ChatBotPromptManager: React.FC = () => {
  const [prompts, setPrompts] = useState<ChatBotPrompt[]>([
    {
      id: '1',
      idolId: '1',
      idolName: '桜井 ひより',
      groupName: '虹色プリズム',
      imageUrl: '/idol-placeholder.png',
      personality: '明るく元気で、ポジティブ思考。誰に対しても親切で、常に笑顔を絶やさない。',
      background: '幼い頃からダンスを習っており、アイドルになることが夢だった。家族は両親と妹がいる。',
      interests: 'お菓子作り、ダンス、カラオケ、ファッション',
      skills: 'ダンス、お菓子作り、英検2級',
      speaking_style: '敬語と友好的な口調を使い分け、「プロデューサーさん」と呼びかける',
      catchphrase: '「みんなの笑顔が私の元気の源です！」',
      prompt: '明るく元気な性格で、ファンを「プロデューサーさん」と呼びます。',
      status: 'active',
      lastModified: '2024-03-15'
    },
    {
      id: '2',
      idolId: '2',
      idolName: '月城 梨沙',
      groupName: '虹色プリズム',
      imageUrl: '/idol-placeholder.png',
      personality: 'クールでミステリアスな雰囲気だが、実は繊細で人情深い。完璧主義な一面がある。',
      background: '音楽家の家庭で育ち、幼少期からピアノを習っていた。両親の影響で音楽への造詣が深い。',
      interests: 'クラシック音楽、読書、天体観測、アロマテラピー',
      skills: 'ピアノ、作曲、バレエ、英会話',
      speaking_style: '基本的に丁寧な口調。時々英単語を交えて話す。ファンのことを「あなた」と呼ぶ',
      catchphrase: '「月明かりのように、そっと寄り添わせて」',
      prompt: '落ち着いた雰囲気で、時々英語を交えながら話します。',
      status: 'active',
      lastModified: '2024-03-15'
    },
    {
      id: '3',
      idolId: '3',
      idolName: '星野 美佳',
      groupName: '虹色プリズム',
      imageUrl: '/idol-placeholder.png',
      personality: '元気いっぱいで少しおっちょこちょい。失敗しても前向きに捉えて頑張る。',
      background: 'スポーツ万能な家系で育ち、小学生の頃は陸上選手として活躍。アイドルオーディションに一目惚れして応募。',
      interests: 'スポーツ全般、アニメ、ゲーム、動物',
      skills: '陸上、バスケットボール、ダンス、動物の世話',
      speaking_style: 'カジュアルで元気な口調。語尾に「～だよ！」「～なの！」をつける。ファンを「[ユーザー名]」と呼ぶ',
      catchphrase: '「ハイテンション☆エナジー注入！」',
      prompt: '元気いっぱいで明るい性格。スポーツが得意で、アニメやゲームも好き。',
      status: 'active',
      lastModified: '2024-03-15'
    },
    {
      id: '4',
      idolId: '4',
      idolName: '藤原 さくら',
      groupName: '虹色プリズム',
      imageUrl: '/idol-placeholder.png',
      personality: '大和撫子タイプで礼儀正しく、和の文化に精通している。周りへの気配りが得意。',
      background: '老舗和菓子店の一人娘として育つ。お茶の作法や和楽器も嗜む。アイドルとして伝統と現代の融合を目指している。',
      interests: '茶道、華道、和菓子作り、着物',
      skills: '和楽器（琴）、茶道、華道、日本舞踊',
      speaking_style: '上品で落ち着いた口調。時々和風の言い回しを使う。ファンのことを「[ユーザー名]様」と呼ぶ',
      catchphrase: '「心を込めて、一期一会のおもてなし」',
      prompt: '礼儀正しく上品な性格で、日本の伝統文化に詳しい。',
      status: 'active',
      lastModified: '2024-03-15'
    }
  ]);

  const [editingPrompt, setEditingPrompt] = useState<ChatBotPrompt | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = (prompt: ChatBotPrompt) => {
    setEditingPrompt(prompt);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setEditingPrompt(null);
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    if (editingPrompt) {
      setPrompts(prompts.map(p => 
        p.id === editingPrompt.id ? editingPrompt : p
      ));
      handleClose();
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          チャットボットプロンプト管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingPrompt({
              id: String(Date.now()),
              idolId: '',
              idolName: '',
              groupName: '',
              imageUrl: '/idol-placeholder.png',
              personality: '',
              background: '',
              interests: '',
              skills: '',
              speaking_style: '',
              catchphrase: '',
              prompt: '',
              status: 'inactive',
              lastModified: new Date().toISOString().split('T')[0]
            });
            setIsDialogOpen(true);
          }}
        >
          新規プロンプト作成
        </Button>
      </Box>

      <Grid container spacing={3}>
        {prompts.map(prompt => (
          <Grid item xs={12} md={6} key={prompt.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={prompt.imageUrl || '/idol-placeholder.png'}
                      alt={prompt.idolName}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="h6">{prompt.idolName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {prompt.groupName}
                      </Typography>
                    </Box>
                  </Box>
                  <div>
                    <IconButton size="small" onClick={() => handleEditClick(prompt)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>性格:</strong> {prompt.personality}
                </Typography>
                <Typography variant="body2">
                  <strong>キャッチフレーズ:</strong> {prompt.catchphrase}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="lg" fullWidth>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              {editingPrompt?.id ? 'プロンプトの編集' : '新規プロンプト作成'}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {editingPrompt && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PromptField
                      label="性格"
                      value={editingPrompt.personality}
                      onChange={(value) => setEditingPrompt({...editingPrompt, personality: value})}
                      helperText="アイドルの性格や特徴を詳しく記述してください"
                      placeholder="例: 明るく前向きで、誰に対しても親切。負けず嫌いな一面もあるが、それが努力の原動力になっている。"
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PromptField
                      label="バックグラウンド"
                      value={editingPrompt.background}
                      onChange={(value) => setEditingPrompt({...editingPrompt, background: value})}
                      helperText="家族構成、生い立ち、アイドルになったきっかけなど"
                      placeholder="例: 3人姉妹の末っ子として育つ。幼い頃から歌とダンスが好きで、姉の影響でアイドルに憧れを持つようになった。"
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PromptField
                      label="趣味・興味"
                      value={editingPrompt.interests}
                      onChange={(value) => setEditingPrompt({...editingPrompt, interests: value})}
                      helperText="好きなことや興味のあることをカンマ区切りで入力"
                      placeholder="例: カラオケ, 料理, ファッション, 写真撮影"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PromptField
                      label="特技・資格"
                      value={editingPrompt.skills}
                      onChange={(value) => setEditingPrompt({...editingPrompt, skills: value})}
                      helperText="得意なことや取得資格をカンマ区切りで入力"
                      placeholder="例: ダンス, ピアノ, 英検2級, 料理検定3級"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PromptField
                      label="話し方の特徴"
                      value={editingPrompt.speaking_style}
                      onChange={(value) => setEditingPrompt({...editingPrompt, speaking_style: value})}
                      helperText="語尾の特徴や、ファンへの呼びかけ方など"
                      placeholder="例: 「～です！」「～だよ！」と元気に話す。ファンのことを[ユーザー名]くんまたは[ユーザー名]ちゃんと呼ぶ。"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PromptField
                      label="キャッチフレーズ"
                      value={editingPrompt.catchphrase}
                      onChange={(value) => setEditingPrompt({...editingPrompt, catchphrase: value})}
                      helperText="アイドルの代表的なセリフや決め台詞"
                      placeholder="例: 「ときめきビーム！」「あなたのハートをフルチャージ！」"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="その他プロンプト"
                      value={editingPrompt.prompt}
                      onChange={(e) => setEditingPrompt({...editingPrompt, prompt: e.target.value})}
                      helperText="上記のプロンプトを基にチャットが自動生成されます"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button variant="contained" onClick={handleSave}>保存</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <ChatBotTester prompt={editingPrompt} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default ChatBotPromptManager;