import { render } from '@testing-library/react';
import Jobs from './jobs';

describe('Jobs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Jobs />);
    expect(baseElement).toBeTruthy();
  });
});
