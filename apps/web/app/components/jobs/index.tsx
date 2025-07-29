import React from 'react';
import DashboardNavBar from '../system/dashBoardNavBar';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

interface JobsProps {
  jobs: Job[];
}

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
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
        No job listings available.
      </div>
    );
  }

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
      <main className="main-content">
        <section className="section">
          <h3>Job Listings</h3>
          <div className="card">
            <p>Recent job postings</p>
            <p>Active applications</p>
            <p>Pending approvals</p>
          </div>
          <ul>
            {jobs.map((job) => (
              <li key={job.id} style={{ marginBottom: '1.5rem' }}>
                <h3>{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.company}
                  <br />
                  <strong>Location:</strong> {job.location}
                </p>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Jobs;
