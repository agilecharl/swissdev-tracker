import { render } from '@testing-library/react';
import AgentCards from './agent-card';

describe('AgentCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgentCards image={''} title={''} buttonText={''} onButtonClick={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
