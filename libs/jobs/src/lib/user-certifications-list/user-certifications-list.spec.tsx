import { render } from '@testing-library/react';
import UserCertificationsList from './user-certifications-list';

describe('UserCertificationsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserCertificationsList />);
    expect(baseElement).toBeTruthy();
  });
});
