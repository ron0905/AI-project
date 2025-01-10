import React from 'react';
import SingleGroupView from './SingleGroupView';

const IdolManagementView: React.FC = () => {
  // 固定のアイドルIDを使用
  const idolId = '1';

  return (
    <SingleGroupView 
      idolId={idolId}
      onBack={() => console.log('Back button clicked')}
    />
  );
};

export default IdolManagementView;