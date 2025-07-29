//import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Job Board</h2>
        <ul>
          <li>Job Listings</li>
          <li>Applicant Tracking</li>
          <li>Company Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="section">
          <h3>Job Listings</h3>
          <div className="card">
            <p>Recent job postings</p>
            <p>Active applications</p>
            <p>Pending approvals</p>
          </div>
        </section>

        <section className="section">
          <h3>Applicant Tracking</h3>
          <div className="card">
            <p>Interviews scheduled</p>
            <p>Pending reviews</p>
            <p>Completed hires</p>
          </div>
        </section>

        <section className="section">
          <h3>Company Profile</h3>
          <div className="card">
            <p>Company details</p>
            <p>Employee stats</p>
            <p>Update profile</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
