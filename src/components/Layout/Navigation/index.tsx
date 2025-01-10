import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  LibraryMusic as LibraryMusicIcon,
  Chat as ChatIcon,
  Payments as PaymentsIcon,
  LiveTv as LiveTvIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Image,
  Videocam,
  AudioFile,
  Web,
  Shop,
  Storage
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { ViewType } from '../../../types/types';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [contentOpen, setContentOpen] = useState(false);

  const handleContentClick = () => {
    setContentOpen(!contentOpen);
    navigate('/content-management');
  };

  const mainMenuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: <DashboardIcon />, path: '/' },
    { id: 'idolManagement', label: 'AIアイドル管理', icon: <PersonIcon />, path: '/groups' },
    { id: 'billing', label: '課金管理', icon: <PaymentsIcon />, path: '/billing' },
    { id: 'liveManagement', label: 'ライブ管理', icon: <LiveTvIcon />, path: '/live' },
    { id: 'settings', label: '設定', icon: <SettingsIcon />, path: '/settings' }
  ];

  const contentSubMenuItems = [
    { id: 'chat', label: 'チャット関連', icon: <ChatIcon />, path: '/content-management/chat' },
    { id: 'images', label: '画像関連', icon: <Image />, path: '/content-management/images' },
    { id: 'videos', label: '動画関連', icon: <Videocam />, path: '/content-management/videos' },
    { id: 'audio', label: '音声関連', icon: <AudioFile />, path: '/content-management/audio' },
    { id: 'site', label: 'サイト関連', icon: <Web />, path: '/content-management/site' },
    { id: 'goods', label: 'グッズ関連', icon: <Shop />, path: '/content-management/goods' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(249, 250, 251)',
          borderRight: '1px solid rgb(229, 231, 235)'
        },
      }}
    >
      <List sx={{ pt: 2 }}>
        {mainMenuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                mx: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgb(243, 244, 246)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
            {index === 1 && (
              <>
                <ListItem
                  button
                  onClick={handleContentClick}
                  sx={{
                    mb: contentOpen ? 0 : 1,
                    mx: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgb(243, 244, 246)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Storage />
                  </ListItemIcon>
                  <ListItemText primary="コンテンツ管理" />
                  {contentOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={contentOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {contentSubMenuItems.map((item) => (
                      <ListItem
                        button
                        key={item.id}
                        component={Link}
                        to={item.path}
                        sx={{
                          pl: 4,
                          py: 1,
                          '&:hover': {
                            backgroundColor: 'rgb(243, 244, 246)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}; 