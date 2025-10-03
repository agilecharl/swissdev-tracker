import { render } from '@testing-library/react';
import DefaultDashboard from './default-dashboard';

describe('DefaultDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
