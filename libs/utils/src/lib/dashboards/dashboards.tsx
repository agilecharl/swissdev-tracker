import React, { useState } from 'react';
import styles from './dashboards.module.css';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'SwissDev AG',
    location: 'Zurich',
    description: 'Work on modern React applications.',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Tech Solutions',
    location: 'Bern',
    description: 'Develop scalable APIs and services.',
  },
];

export function JobPortal() {
  const [jobs] = useState<Job[]>(mockJobs);

  return (
    <div className={styles['job-portal']}>
      <h2>Job Portal</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className={styles['job-item']}>
            <h3>{job.title}</h3>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Dashboard = () => {
  return (
    <div className={styles['dashboard']}>
      <JobPortal />
    </div>
  );
};

