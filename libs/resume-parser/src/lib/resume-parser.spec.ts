import { resumeParser } from './resume-parser.js';

describe('resumeParser', () => {
  it('should work', () => {
    expect(resumeParser()).toEqual('resume-parser');
  });
});
