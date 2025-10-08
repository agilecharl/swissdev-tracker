import { render } from '@testing-library/react';
import JobTitlesCards from './job-title-card';

describe('JobTitlesCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobTitlesCards />);
    expect(baseElement).toBeTruthy();
  });
});
