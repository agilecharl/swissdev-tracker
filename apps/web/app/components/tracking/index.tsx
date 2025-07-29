import React from 'react';
import DashboardNavBar from '../system/dashBoardNavBar';

const Tracking: React.FC = () => {
  return (
    <div>
      <DashboardNavBar
        items={[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '/jobs' },
          { label: 'Tracking', href: '/tracking' },
          { label: 'Companies', href: '/companies' },
        ]}
      />
      <h1>Tracking</h1>
      <p>Welcome to the tracking page.</p>
    </div>
  );
};

export default Tracking;
