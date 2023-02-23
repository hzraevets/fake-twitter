import { enableLocalStorageMock, enableMatchMedia } from './browserMocks';

describe('localStorageMock', () => {
  beforeEach(() => {
    enableLocalStorageMock();
  });

  it('localStorage should work correctly', () => {
    expect(localStorage.getItem('myCat')).toBeNull();

    localStorage.setItem('myCat', 'Tom');
    expect(localStorage.getItem('myCat')).toBe('Tom');

    localStorage.removeItem('myCat');
    expect(localStorage.getItem('myCat')).toBeNull();

    localStorage.setItem('myCat', 'Tom');
    localStorage.setItem('myRat', 'Jerry');
    expect(localStorage.getItem('myCat')).not.toBeNull();
    expect(localStorage.getItem('myRat')).not.toBeNull();

    localStorage.clear();
    expect(localStorage.getItem('myCat')).toBeNull();
    expect(localStorage.getItem('myRat')).toBeNull();
  });
});

describe('matchMedia', () => {
  beforeEach(() => {
    enableMatchMedia();
  });

  it('matchMedia should', () => {
    expect(window.matchMedia).not.toBeNull();
  });
});
