import React from 'react';

type JobCounterProps = {
  count: number;
  label?: string;
};

const JobCounter: React.FC<JobCounterProps> = ({ count, label = 'Jobs' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{count}</span>
      <span>{label}</span>
    </div>
  );
};

export default JobCounter;
