import { render } from '@testing-library/react';
import JobCertificationsList from './job-certifications-list';

describe('JobCertificationsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobCertificationsList />);
    expect(baseElement).toBeTruthy();
  });
});
