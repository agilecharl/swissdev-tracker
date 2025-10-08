import { render } from '@testing-library/react';
import JobTitlesList from './job-titles-list';

describe('JobTitlesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobTitlesList />);
    expect(baseElement).toBeTruthy();
  });
});
