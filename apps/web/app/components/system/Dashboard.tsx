import DashboardNavBar from './dashBoardNavBar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Dashboard Navbar */}
      <DashboardNavBar items={[]} />

      {/* Main Content */}
      <main className="main-content"></main>
    </div>
  );
};

export default Dashboard;
