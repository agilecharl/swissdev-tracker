import styles from './job-card.module.css';

interface Job {
  id: string;
  title: string;
  // Add other job properties as needed
}

interface JobsCardProps {
  jobs?: Job[];
}

export function JobsCard({ jobs = [] }: JobsCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Jobs ({jobs.length})</h1>
      {jobs.length > 0 ? (
        <div>
          {jobs.map((job) => (
            <div key={job.id} className={styles['job-item']}>
              <h3>{job.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
}

export default JobsCard;
