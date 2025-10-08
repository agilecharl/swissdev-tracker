import { render } from '@testing-library/react';
import UserCertificationCard from './user-certification-card';

describe('UserCertificationCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserCertificationCard />);
    expect(baseElement).toBeTruthy();
  });
});
