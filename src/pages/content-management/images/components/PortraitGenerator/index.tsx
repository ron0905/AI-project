import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
  FormHelperText,
  Tooltip,
  ListSubheader
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';

const poses = [
  { value: 'standing', label: '立ち姿' },
  { value: 'sitting', label: '着席' },
  { value: 'close-up', label: 'クローズアップ' },
  { value: 'three-quarter', label: '斜め45度' }
];

const behaviors = [
  { value: 'energetic', label: '元気いっぱい' },
  { value: 'elegant', label: '優雅' },
  { value: 'cute', label: '可愛らしい' },
  { value: 'cool', label: 'クール' },
  { value: 'mysterious', label: '神秘的' }
];

const backgrounds = [
  { value: 'white', label: '白' },
  { value: 'black', label: '黒' },
  { value: 'pink', label: 'ピンク' },
  { value: 'blue', label: 'ブルー' },
  { value: 'gradient', label: 'グラデーション' },
  { value: 'studio', label: 'スタジオ' }
];

const personalities = [
  { value: 'cheerful', label: '明るく活発', prompt: 'cheerful and energetic personality' },
  { value: 'gentle', label: '優しく温厚', prompt: 'gentle and kind personality' },
  { value: 'confident', label: '自信家', prompt: 'confident and self-assured personality' },
  { value: 'shy', label: '控えめ', prompt: 'shy and reserved personality' },
  { value: 'determined', label: '芯が強い', prompt: 'determined and strong-willed personality' },
  { value: 'playful', label: '茶目っ気がある', prompt: 'playful and mischievous personality' },
  { value: 'elegant', label: '上品で落ち着いている', prompt: 'elegant and composed personality' },
  { value: 'honest', label: '素直で誠実', prompt: 'honest and sincere personality' },
  { value: 'passionate', label: '情熱的', prompt: 'passionate and enthusiastic personality' },
  { value: 'caring', label: '世話焼き', prompt: 'caring and nurturing personality' }
];

const costumes = [
  { value: 'idol_uniform', label: 'アイドル衣装（定番）', prompt: 'classic idol costume with frills and ribbons' },
  { value: 'casual', label: 'カジュアル', prompt: 'casual modern fashion outfit' },
  { value: 'dress', label: 'ドレス', prompt: 'elegant dress with detailed design' },
  { value: 'school', label: '制服', prompt: 'Japanese school uniform' },
  { value: 'stage', label: 'ステージ衣装', prompt: 'flashy stage performance costume' }
];

const hairStyles = [
  { value: 'long', label: 'ロング', prompt: 'long straight hair' },
  { value: 'twin', label: 'ツインテール', prompt: 'twin tails' },
  { value: 'short', label: 'ショート', prompt: 'short hair' },
  { value: 'pony', label: 'ポニーテール', prompt: 'ponytail' },
  { value: 'wavy', label: 'ウェーブ', prompt: 'wavy hair' }
];

const hairColors = [
  { value: 'black', label: '黒髪', prompt: 'black hair' },
  { value: 'brown', label: '茶髪', prompt: 'brown hair' },
  { value: 'blonde', label: '金髪', prompt: 'blonde hair' },
  { value: 'pink', label: 'ピンク', prompt: 'pink hair' },
  { value: 'silver', label: 'シルバー', prompt: 'silver hair' }
];

const makeupStyles = [
  { value: 'natural', label: 'ナチュラル', prompt: 'natural makeup' },
  { value: 'cute', label: 'キュート', prompt: 'cute makeup with pink tones' },
  { value: 'cool', label: 'クール', prompt: 'cool makeup with sharp lines' },
  { value: 'stage', label: 'ステージメイク', prompt: 'dramatic stage makeup' },
  { value: 'glitter', label: 'キラキラ', prompt: 'glitter makeup with sparkles' }
];

const brightnessTypes = [
  { value: 'very_bright', label: 'とても明るい', prompt: 'very cheerful and radiant personality' },
  { value: 'positive', label: '前向き', prompt: 'positive and optimistic personality' },
  { value: 'balanced', label: 'バランスが取れている', prompt: 'balanced and stable personality' },
  { value: 'mature', label: '大人びている', prompt: 'mature and sophisticated personality' },
  { value: 'reserved', label: '控えめ', prompt: 'reserved and modest personality' }
];

const sociabilityTypes = [
  { value: 'leader', label: 'リーダーシップがある', prompt: 'natural leader, takes initiative in social situations' },
  { value: 'supportive', label: 'サポート役', prompt: 'supportive team player, helps others' },
  { value: 'independent', label: '自立的', prompt: 'independent, comfortable working alone' },
  { value: 'mediator', label: '調和を重視', prompt: 'mediator, promotes harmony in groups' },
  { value: 'follower', label: 'フォロワー気質', prompt: 'good follower, works well under direction' }
];

const idolQualities = [
  { value: 'performer', label: '表現力が豊か', prompt: 'expressive performer with strong stage presence' },
  { value: 'versatile', label: '多才', prompt: 'versatile entertainer skilled in multiple areas' },
  { value: 'charismatic', label: 'カリスマ性がある', prompt: 'charismatic idol with strong audience appeal' },
  { value: 'growing', label: '成長志向', prompt: 'growth-minded idol focused on improvement' },
  { value: 'unique', label: '個性的', prompt: 'unique idol with distinctive charm' }
];

type PersonalityOption = {
  value: string;
  label: string;
  prompt: string;
};

type PersonalityCategory = {
  category: string;
  options: PersonalityOption[];
};

const personalityTypes = [
  { value: 'pure', label: '純真・素直', prompt: 'pure-hearted and genuine personality' },
  { value: 'strong', label: '芯が強い', prompt: 'strong-willed and resilient personality' },
  { value: 'calm', label: '落ち着いている', prompt: 'calm and composed personality' },
  { value: 'creative', label: '創造的', prompt: 'creative and imaginative personality' },
  { value: 'logical', label: '論理的', prompt: 'logical and analytical personality' },
  { value: 'emotional', label: '感情豊か', prompt: 'emotionally expressive personality' },
  { value: 'perfectionist', label: '完璧主義', prompt: 'perfectionist and detail-oriented personality' },
  { value: 'flexible', label: '柔軟', prompt: 'flexible and adaptable personality' },
  { value: 'independent', label: '自立的', prompt: 'independent and self-reliant personality' },
  { value: 'considerate', label: '思いやりがある', prompt: 'considerate and empathetic personality' }
];

const characterImageTypes = [
  { value: 'cute', label: '王道アイドル', prompt: 'classic idol image, cute and charming' },
  { value: 'cool', label: 'クールビューティー', prompt: 'cool beauty idol image with elegant presence' },
  { value: 'natural', label: '親近感のある', prompt: 'natural and approachable idol image' },
  { value: 'princess', label: 'お姫様系', prompt: 'princess-like idol with graceful demeanor' },
  { value: 'energetic', label: 'エネルギッシュ', prompt: 'energetic and dynamic idol image' },
  { value: 'mysterious', label: '神秘的', prompt: 'mysterious and enchanting idol image' },
  { value: 'intellectual', label: '知的', prompt: 'intellectual and sophisticated idol image' },
  { value: 'sporty', label: 'スポーティ', prompt: 'sporty and athletic idol image' },
  { value: 'traditional', label: '和風美人', prompt: 'traditional Japanese beauty idol image' },
  { value: 'fashion', label: 'ファッショニスタ', prompt: 'fashion-forward trendsetting idol image' }
];

type FormFieldProps = {
  title: string;
  tooltip: string;
  children: React.ReactNode;
  type?: 'select' | 'number' | 'slider' | 'text';
};

const FormField = ({ title, tooltip, children, type = 'select' }: FormFieldProps) => {
  const commonBoxStyles = {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 1,
    position: 'relative' as const,
    mt: 1,
    p: 1.5
  };

  const titleElement = (
    <Box
      sx={{
        position: 'absolute',
        top: -9,
        left: 8,
        px: 0.5,
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        zIndex: 1,
        height: 18
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}
      >
        {title}
      </Typography>
      <Tooltip title={tooltip} arrow placement="top">
        <InfoIcon 
          sx={{ 
            fontSize: 16, 
            color: 'text.secondary', 
            cursor: 'help',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }} 
        />
      </Tooltip>
    </Box>
  );

  if (type === 'select') {
    return (
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {titleElement}
          <Select
            size="small"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                display: 'none'
              },
              '& .MuiSelect-select': {
                ...commonBoxStyles,
                p: 1.5
              }
            }}
            {...(children as any).props}
          >
            {(children as any).props.children}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  if (type === 'number') {
    return (
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {titleElement}
          <Select
            size="small"
            value={(children as any).props.value}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                display: 'none'
              },
              '& .MuiSelect-select': {
                ...commonBoxStyles,
                p: 1.5,
                height: '32px !important',
                lineHeight: '32px',
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            <Box sx={{ p: 1 }}>
              <TextField
                {...(children as any).props}
                fullWidth
                variant="standard"
                size="small"
                InputProps={{
                  disableUnderline: true,
                  sx: { 
                    height: '32px',
                    '& input': {
                      height: '32px',
                      padding: 0
                    }
                  }
                }}
              />
            </Box>
          </Select>
        </FormControl>
      </Grid>
    );
  }

  if (type === 'slider') {
    return (
      <Grid item xs={12}>
        <Box sx={commonBoxStyles}>
          {titleElement}
          {children}
        </Box>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} md={6}>
      <Box sx={commonBoxStyles}>
        {titleElement}
        {children}
      </Box>
    </Grid>
  );
};

type GeneratorSettings = {
  age: number;
  basePersonality: string;
  brightness: string;
  sociability: string;
  idolQuality: string;
  characterImage: string;
  behavior: string;
  pose: string;
  background: string;
  costume: string;
  hairStyle: string;
  hairColor: string;
  makeup: string;
  strength: number;
  seed: number;
  customPrompt: string;
  generationCount: number;
};

const initialSettings: GeneratorSettings = {
  age: 18,
  basePersonality: '',
  brightness: '',
  sociability: '',
  idolQuality: '',
  characterImage: '',
  behavior: '',
  pose: 'standing',
  background: 'white',
  costume: '',
  hairStyle: '',
  hairColor: '',
  makeup: '',
  strength: 75,
  seed: 1000,
  customPrompt: '',
  generationCount: 1,
};

type GeneratedImage = {
  id: string;
  imageUrl: string;
  settings: GeneratorSettings;
  timestamp: number;
};

type SavedImage = {
  id: string;
  imageUrl: string;
  settings: GeneratorSettings;
  timestamp: number;
};

const PortraitGenerator: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<GeneratorSettings>(initialSettings);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, age: Number(e.target.value)});
  };

  const handleGeneratePreview = () => {
    setIsGenerating(true);
    
    // 生成枚数分の配列を作成
    const newImages: GeneratedImage[] = Array.from({ length: settings.generationCount }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: '/idol-placeholder.png', // 仮の画像URL
      settings: { ...settings },
      timestamp: Date.now()
    }));
    
    // 実際のAPI呼び出しの代わりに、仮のタイマーを使用
    setTimeout(() => {
      setGeneratedImages(prev => [...newImages, ...prev]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleDeleteImage = (imageId: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSaveImage = (imageId: string) => {
    const imageToSave = generatedImages.find(img => img.id === imageId);
    if (imageToSave) {
      setSavedImages(prev => [
        {
          ...imageToSave,
          timestamp: Date.now()
        },
        ...prev
      ]);
      setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('履歴をクリアしてもよろしいですか？')) {
      setSavedImages([]);
    }
  };

  const handleSaveAllImages = () => {
    const imagesToSave = generatedImages.map(img => ({
      ...img,
      timestamp: Date.now()
    }));
    
    setSavedImages(prev => [...imagesToSave, ...prev]);
    setGeneratedImages([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              生成設定
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={1.5}>
              <FormField 
                title="年齢" 
                type="select"
                tooltip="18歳から26歳までの範囲で設定できます。"
              >
                <Select
                  value={settings.age}
                  onChange={(e) => setSettings({...settings, age: Number(e.target.value)})}
                >
                  {Array.from({ length: 9 }, (_, i) => i + 18).map((age) => (
                    <MenuItem key={age} value={age}>
                      {age}歳
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="基本性格" 
                type="select"
                tooltip="アイドルの基本的な性格を設定します。"
              >
                <Select
                  value={settings.basePersonality}
                  onChange={(e) => setSettings({...settings, basePersonality: e.target.value})}
                >
                  {personalityTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="明るさ" 
                type="select"
                tooltip="アイドルの明るさや活発さを設定します。"
              >
                <Select
                  value={settings.brightness}
                  onChange={(e) => setSettings({...settings, brightness: e.target.value})}
                >
                  {brightnessTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="社交性" 
                type="select"
                tooltip="アイドルの社交性や対人関係の特徴を設定します。"
              >
                <Select
                  value={settings.sociability}
                  onChange={(e) => setSettings({...settings, sociability: e.target.value})}
                >
                  {sociabilityTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="アイドル資質" 
                type="select"
                tooltip="アイドルとしての特徴や魅力を設定します。"
              >
                <Select
                  value={settings.idolQuality}
                  onChange={(e) => setSettings({...settings, idolQuality: e.target.value})}
                >
                  {idolQualities.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="キャラクターイメージ" 
                type="select"
                tooltip="アイドルとしての全体的なイメージを設定します。"
              >
                <Select
                  value={settings.characterImage}
                  onChange={(e) => setSettings({...settings, characterImage: e.target.value})}
                >
                  {characterImageTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="ポーズ" 
                type="select"
                tooltip="生成される画像のポーズを指定します。"
              >
                <Select
                  value={settings.pose}
                  onChange={(e) => setSettings({...settings, pose: e.target.value})}
                >
                  {poses.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="背景" 
                type="select"
                tooltip="画像の背景設定を選択します。"
              >
                <Select
                  value={settings.background}
                  onChange={(e) => setSettings({...settings, background: e.target.value})}
                >
                  {backgrounds.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="衣装" 
                type="select"
                tooltip="アイドルの衣装を選択します。"
              >
                <Select
                  value={settings.costume}
                  onChange={(e) => setSettings({...settings, costume: e.target.value})}
                >
                  {costumes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="髪型" 
                type="select"
                tooltip="アイドルの髪型を選択します。"
              >
                <Select
                  value={settings.hairStyle}
                  onChange={(e) => setSettings({...settings, hairStyle: e.target.value})}
                >
                  {hairStyles.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="髪の色" 
                type="select"
                tooltip="アイドルの髪の色を選択します。"
              >
                <Select
                  value={settings.hairColor}
                  onChange={(e) => setSettings({...settings, hairColor: e.target.value})}
                >
                  {hairColors.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="メイク" 
                type="select"
                tooltip="アイドルのメイクスタイルを選択します。"
              >
                <Select
                  value={settings.makeup}
                  onChange={(e) => setSettings({...settings, makeup: e.target.value})}
                >
                  {makeupStyles.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <FormField 
                title="ストロング値" 
                type="slider"
                tooltip="AIによる生成時の設定の反映強度を調整します。"
              >
                <Slider
                  value={settings.strength}
                  onChange={(_, value) => setSettings({...settings, strength: value as number})}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </FormField>

              <FormField 
                title="シード値" 
                type="slider"
                tooltip="画像生成のバリエーションを調整するための値です。"
              >
                <Slider
                  value={settings.seed}
                  onChange={(_, value) => setSettings({...settings, seed: value as number})}
                  valueLabelDisplay="auto"
                  min={0}
                  max={999999}
                  step={1}
                />
              </FormField>

              <FormField 
                title="生成枚数" 
                type="select"
                tooltip="一度に生成する画像の枚数を設定します（1〜4枚）"
              >
                <Select
                  value={settings.generationCount}
                  onChange={(e) => setSettings({...settings, generationCount: Number(e.target.value)})}
                  size="small"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}枚
                    </MenuItem>
                  ))}
                </Select>
              </FormField>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? '基本設定に戻る' : '高度な設定を表示'}
                </Button>
              </Grid>

              {showAdvanced && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="自由プロンプト（上級者向け）"
                    size="small"
                    value={settings.customPrompt}
                    onChange={(e) => setSettings({...settings, customPrompt: e.target.value})}
                    placeholder="追加のプロンプトをカンマ区切りで入力..."
                    helperText="基本設定を上書きする可能性があります"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PreviewIcon />}
                  onClick={handleGeneratePreview}
                  disabled={isGenerating}
                >
                  {isGenerating ? '生成中...' : 'プレビュー生成'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>


        {/* 右側: プレビュー・生成履歴 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                生成プレビュー（最大{settings.generationCount}枚）
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={() => setGeneratedImages([])}
                  disabled={generatedImages.length === 0}
                >
                  クリア
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<SaveIcon />}
                  disabled={generatedImages.length === 0}
                  onClick={handleSaveAllImages}
                >
                  すべて保存
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ 
              maxHeight: 'calc(100vh - 500px)', 
              minHeight: '400px',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
                '&:hover': {
                  background: '#555',
                },
              },
            }}>
              {generatedImages.length > 0 ? (
                <Grid container spacing={2} sx={{ p: 1 }}>
                  {generatedImages.map((image) => (
                    <Grid item xs={12} sm={6} md={3} key={image.id}>
                      <Card sx={{ height: '100%' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={image.imageUrl}
                          alt="Generated Preview"
                          sx={{
                            objectFit: 'cover',
                            backgroundColor: 'grey.100'
                          }}
                        />
                        <CardContent sx={{ p: 1 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Box>
                              <IconButton 
                                size="small" 
                                onClick={() => handleSaveImage(image.id)}
                                sx={{ mr: 1 }}
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton 
                                size="small"
                                onClick={() => handleDeleteImage(image.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(image.timestamp).toLocaleTimeString()}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '100%',
                  minHeight: '300px'
                }}>
                  <Typography color="text.secondary">
                    プレビューを生成してください
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>

          <Paper sx={{ p: 2, height: 'calc(100vh - 450px)', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                保存履歴
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DeleteIcon />}
                disabled={savedImages.length === 0}
                onClick={handleClearHistory}
              >
                履歴をクリア
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {savedImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={image.imageUrl}
                      alt="Saved Image"
                    />
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {new Date(image.timestamp).toLocaleString()}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <IconButton size="small">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortraitGenerator; 