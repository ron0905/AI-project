import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import IdolManagementView from './components/IdolManagement/IdolManagementView';
import SingleGroupView from './components/IdolManagement/SingleGroupView';
import ChatManagement from './pages/content-management/chat';
import ImageManagement from './pages/content-management/images';
import VideoManagement from './pages/content-management/videos';
import AudioManagement from './pages/content-management/audio';
import SiteManagement from './pages/content-management/site';
import GoodsManagement from './pages/content-management/goods';
import ContentManagement from './pages/content-management';

const GroupViewWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <SingleGroupView idolId="default" onBack={() => navigate(-1)} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/idols" element={<IdolManagementView />} />
          <Route path="/groups" element={<GroupViewWrapper />} />
          
          {/* コンテンツ管理のメインルート */}
          <Route path="/content-management" element={<ContentManagement />} />
          <Route path="/content-management/chat" element={<ChatManagement />} />
          <Route path="/content-management/images" element={<ImageManagement />} />
          <Route path="/content-management/videos" element={<VideoManagement />} />
          <Route path="/content-management/audio" element={<AudioManagement />} />
          <Route path="/content-management/site" element={<SiteManagement />} />
          <Route path="/content-management/goods" element={<GoodsManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
