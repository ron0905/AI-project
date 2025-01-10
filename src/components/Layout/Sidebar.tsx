import React, { useState } from 'react';
import { ViewType } from '../../types/types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ChatIcon from '@mui/icons-material/Chat';
import PaymentsIcon from '@mui/icons-material/Payments';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import {
  Chat,
  Image,
  Videocam,
  AudioFile,
  Web,
  Shop,
  ExpandLess,
  ExpandMore,
  Storage
} from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [contentOpen, setContentOpen] = useState(false);

  const handleContentClick = () => {
    console.log('Current state:', contentOpen);
    setContentOpen(!contentOpen);
    console.log('New state:', !contentOpen);
  };

  const drawerProps = {
    sx: {
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: 'rgb(249, 250, 251)',
        borderRight: '1px solid rgb(229, 231, 235)'
      },
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      path: '/',
      icon: <DashboardIcon />,
      label: 'ダッシュボード'
    },
    {
      id: 'idols',
      path: '/idols',
      icon: <PersonIcon />,
      label: 'AIアイドル管理'
    },
    {
      id: 'groups',
      path: '/groups',
      icon: <GroupIcon />,
      label: 'グループ管理'
    }
  ];

  return (
    <Drawer variant="permanent" {...drawerProps}>
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.id}
            button
            onClick={() => onViewChange(item.id as ViewType)}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgb(243, 244, 246)'
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

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
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText primary="コンテンツ管理" />
          {contentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={contentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ mb: 1 }}>
            <ListItem component={Link} to="/content-management/chat" sx={{ pl: 4 }}>
              <ListItemIcon><Chat /></ListItemIcon>
              <ListItemText primary="チャット関連" />
            </ListItem>
            
            <ListItem component={Link} to="/content-management/images" sx={{ pl: 4 }}>
              <ListItemIcon><Image /></ListItemIcon>
              <ListItemText primary="画像関連" />
            </ListItem>

            <ListItem component={Link} to="/content-management/videos" sx={{ pl: 4 }}>
              <ListItemIcon><Videocam /></ListItemIcon>
              <ListItemText primary="動画関連" />
            </ListItem>

            <ListItem component={Link} to="/content-management/audio" sx={{ pl: 4 }}>
              <ListItemIcon><AudioFile /></ListItemIcon>
              <ListItemText primary="音声関連" />
            </ListItem>

            <ListItem component={Link} to="/content-management/site" sx={{ pl: 4 }}>
              <ListItemIcon><Web /></ListItemIcon>
              <ListItemText primary="サイト関連" />
            </ListItem>

            <ListItem component={Link} to="/content-management/goods" sx={{ pl: 4 }}>
              <ListItemIcon><Shop /></ListItemIcon>
              <ListItemText primary="グッズ関連" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;