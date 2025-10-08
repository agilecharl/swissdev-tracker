import { render } from '@testing-library/react';
import UserJobProject from './user-project-card';

describe('UserJobProject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserJobProject />);
    expect(baseElement).toBeTruthy();
  });
});
