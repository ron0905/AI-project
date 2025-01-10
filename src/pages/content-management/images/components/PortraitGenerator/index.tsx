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
  { value: 'elegant', label: '優雅で上品', prompt: 'elegant and refined personality' },
  { value: 'cute', label: '可愛らしい', prompt: 'cute and adorable personality' },
  { value: 'cool', label: 'クールでかっこいい', prompt: 'cool and stylish personality' },
  { value: 'mysterious', label: '神秘的', prompt: 'mysterious and enigmatic personality' }
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
  { value: 'cheerful', label: '明るい', prompt: 'cheerful and positive personality' },
  { value: 'energetic', label: '元気', prompt: 'energetic and lively personality' },
  { value: 'calm', label: '落ち着いている', prompt: 'calm and composed personality' },
  { value: 'reserved', label: '控えめ', prompt: 'reserved and modest personality' }
];

const sociabilityTypes = [
  { value: 'outgoing', label: '社交的', prompt: 'outgoing and friendly personality' },
  { value: 'shy', label: '内気', prompt: 'shy and introverted personality' },
  { value: 'mysterious', label: '神秘的', prompt: 'mysterious and enigmatic personality' },
  { value: 'friendly', label: '親しみやすい', prompt: 'approachable and warm personality' }
];

const idolQualities = [
  { value: 'hardworking', label: '努力家', prompt: 'hardworking and dedicated personality' },
  { value: 'passionate', label: '情熱的', prompt: 'passionate and enthusiastic personality' },
  { value: 'dreamy', label: '夢見がち', prompt: 'dreamy and idealistic personality' },
  { value: 'professional', label: 'プロ意識が高い', prompt: 'professional and responsible personality' }
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

const personalityTypes: PersonalityCategory[] = [
  {
    category: "基本性格",
    options: [
      { value: "cheerful", label: "明るい", prompt: "cheerful and positive personality" },
      { value: "calm", label: "落ち着いている", prompt: "calm and composed personality" },
      // ... その他のオプション
    ]
  },
  // ... その他のカテゴリー
];

const personalityImages = [
  {
    category: 'キャラクターイメージ',
    options: [
      { value: 'cute_idol', label: '王道アイドル', prompt: 'classic cute idol image' },
      { value: 'cool_beauty', label: 'クールビューティー', prompt: 'cool beauty image' },
      { value: 'natural', label: 'ナチュラル', prompt: 'natural friendly image' },
      { value: 'elegant', label: '優雅', prompt: 'elegant graceful image' },
      { value: 'mysterious', label: '神秘的', prompt: 'mysterious image' }
    ]
  }
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
        <Box sx={commonBoxStyles}>
          {titleElement}
          <TextField
            {...(children as any).props}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
              ...(children as any).props.InputProps
            }}
          />
        </Box>
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
    const value = parseInt(e.target.value);
    if (value >= 18 && value <= 29) {
      setSettings({...settings, age: value});
    }
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
                type="number"
                tooltip="18歳から29歳までの範囲で設定できます。生成される画像の年齢イメージに影響します。"
              >
                <TextField
                  type="number"
                  size="small"
                  value={settings.age}
                  onChange={handleAgeChange}
                  InputProps={{ 
                    inputProps: { min: 18, max: 29 }
                  }}
                />
              </FormField>

              <FormField 
                title="性格" 
                type="select"
                tooltip="アイドルの基本的な性格を設定します。"
              >
                <Select
                  value={settings.basePersonality}
                  onChange={(e) => setSettings({...settings, basePersonality: e.target.value})}
                >
                  {personalityTypes.map(category => (
                    <React.Fragment key={category.category}>
                      <ListSubheader>{category.category}</ListSubheader>
                      {category.options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </React.Fragment>
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
                tooltip="アイドルとしての特徴や資質を設定します。"
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
                  {personalityImages[0].options.map(option => (
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