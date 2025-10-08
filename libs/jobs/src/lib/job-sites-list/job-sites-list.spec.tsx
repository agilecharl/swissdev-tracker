import { render } from '@testing-library/react';
import JobsitesList from './job-sites-list';

describe('JobsitesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobsitesList />);
    expect(baseElement).toBeTruthy();
  });
});
