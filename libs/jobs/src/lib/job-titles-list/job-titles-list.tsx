import { useEffect, useState } from 'react';
import { JobTitlesCard } from '@swissdev-tracker/jobs';
import { getRecords } from '@swissdev-tracker/data';
import styles from './job-titles-list.module.css';

interface JobTitle {
  id: string;
  title: string;
  // Add other job properties as needed
}

export function JobsTitlesList() {
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getJobTitles = async () => {
    try {

      setLoading(true);
      setError(null);
      
      const data = await getRecords('jobs/titles', {});
      const jobTitlesData = data as { data: JobTitle[] };

      setJobTitles(jobTitlesData.data);

    } catch (err) {
      console.error('Error fetching job titles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch job titles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobTitles();
  }, []);

  if (loading) {
    return (
      <div className={styles['container']}>
        <div>Loading job titles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['container']}>
        <div>Error: {error}</div>
        <button onClick={getJobTitles}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <JobTitlesCard jobTitles={jobTitles} />
    </div>
  );
}

export default JobsTitlesList;
