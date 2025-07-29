import { jest } from '@jest/globals';

const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe('Rest', () => {});
