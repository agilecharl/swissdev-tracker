import { useEffect, useState } from 'react';
import { JobsCard } from '@swissdev-tracker/jobs';
import { getRecords } from '@swissdev-tracker/data';
import styles from './jobs-list.module.css';

interface Job {
  id: string;
  title: string;
  // Add other job properties as needed
}

export function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRecords('jobs', {});
      setJobs(data as Job[]);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  if (loading) {
    return (
      <div className={styles['container']}>
        <div>Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['container']}>
        <div>Error: {error}</div>
        <button onClick={getJobs}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <JobsCard jobs={jobs} />
    </div>
  );
}

export default JobsList;
