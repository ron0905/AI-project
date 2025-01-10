import React from 'react';
import { Typography, Tabs, Tab, Box } from '@mui/material';
import PortraitGenerator from './components/PortraitGenerator';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`image-tabpanel-${index}`}
      aria-labelledby={`image-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ImageManagement = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        画像関連管理
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="image management tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="宣材写真" />
          <Tab label="MVジャケット写真" disabled />
          <Tab label="写真集" disabled />
          <Tab label="SNS用" disabled />
          <Tab label="グループロゴ" disabled />
          <Tab label="その他" disabled />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <PortraitGenerator />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography variant="body1" color="text.secondary" align="center">
          Coming Soon
        </Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Typography variant="body1" color="text.secondary" align="center">
          Coming Soon
        </Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Typography variant="body1" color="text.secondary" align="center">
          Coming Soon
        </Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Typography variant="body1" color="text.secondary" align="center">
          Coming Soon
        </Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <Typography variant="body1" color="text.secondary" align="center">
          Coming Soon
        </Typography>
      </TabPanel>
    </Box>
  );
};

export default ImageManagement;
