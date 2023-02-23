import { md5 } from './md5';

describe('md5', () => {
  it('calculate passed-in string md5 value', () => {
    expect(md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592');
  });
});
