import { render } from '@testing-library/react';
import AgentCards from './agent-cards';

describe('AgentCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgentCards />);
    expect(baseElement).toBeTruthy();
  });
});
