import styles from './job-title-card.module.css';

interface JobTitles {
  id: string;
  title: string;
  // Add other job titles properties as needed
}

interface JobTitlesCardProps {
  jobTitles?: JobTitles[];
}

export function JobTitlesCard({ jobTitles = [] }: JobTitlesCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Job Titles ({jobTitles.length})</h1>
      {jobTitles.length > 0 ? (
        <div>
          {jobTitles.map((jobTitle) => (
            <div key={jobTitle.id} className={styles['job-title-item']}>
              <h3>{jobTitle.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No job titles available</p>
      )}
    </div>
  );
}

export default JobTitlesCard;
