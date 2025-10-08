import { render } from '@testing-library/react';
import JobTitlesCards from './job-titles-card';

describe('JobTitlesCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobTitlesCards />);
    expect(baseElement).toBeTruthy();
  });
});
