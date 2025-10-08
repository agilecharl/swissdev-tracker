import { render } from '@testing-library/react';
import UserProjectsList from './user-projects-list';

describe('UserProjectsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProjectsList />);
    expect(baseElement).toBeTruthy();
  });
});
