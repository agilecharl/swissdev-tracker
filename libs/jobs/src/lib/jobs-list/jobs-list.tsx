import { JobsCard } from '@swissdev-tracker/jobs'
import styles from './jobs-list.module.css';

export function JobsList() {
  return (
    <div className={styles['container']}>
      <JobsCard />
    </div>
  );
}

export default JobsList;
