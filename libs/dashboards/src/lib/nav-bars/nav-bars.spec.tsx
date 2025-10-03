import { render } from '@testing-library/react';
import NavBars from './nav-bars';

describe('NavBars', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavBars />);
    expect(baseElement).toBeTruthy();
  });
});
