import { render } from '@testing-library/react';
import NavBars from './default-nav-bar';

describe('NavBars', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavBars />);
    expect(baseElement).toBeTruthy();
  });
});
