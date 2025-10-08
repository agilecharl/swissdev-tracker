import { render } from '@testing-library/react';
import UserJobCard from './user-job-card';

describe('UserJobCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserJobCard />);
    expect(baseElement).toBeTruthy();
  });
});
