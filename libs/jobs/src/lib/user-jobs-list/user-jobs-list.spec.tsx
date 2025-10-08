import { render } from '@testing-library/react';
import UserJobsList from './user-jobs-list';

describe('UserJobsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserJobsList />);
    expect(baseElement).toBeTruthy();
  });
});
