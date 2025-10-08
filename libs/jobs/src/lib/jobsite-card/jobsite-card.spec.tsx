import { render } from '@testing-library/react';
import JobsiteCard from './jobsite-card';

describe('JobsiteCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JobsiteCard />);
    expect(baseElement).toBeTruthy();
  });
});
