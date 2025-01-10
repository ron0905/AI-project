import React from 'react';
import { ViewType } from '../../types/types';
import { Dashboard } from '../Dashboard';
import GroupManagementView from '../IdolManagement/GroupManagementView';
import SingleGroupView from '../IdolManagement/SingleGroupView';

interface MainContentProps {
  currentView: ViewType;
}

const MainContent: React.FC<MainContentProps> = ({ currentView }) => {
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'idolManagement':
        return <GroupManagementView />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-auto p-6">
      {renderContent()}
    </main>
  );
};

export default MainContent; 