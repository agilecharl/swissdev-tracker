import React from 'react';
import NavBar from './navBar';

const Dashboard: React.FC = () => {
  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      <p>
        Welcome to your dashboard. Here you can track your progress and view
        system stats.
      </p>
      {/* Add dashboard widgets/components here */}
    </div>
  );
};

export default Dashboard;
