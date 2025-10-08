import { render } from '@testing-library/react';
import JobsCard from './job-card';

describe('JobsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobsCard />);
    expect(baseElement).toBeTruthy();
  });
});
