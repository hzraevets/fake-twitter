import '@testing-library/jest-dom';

// https://stackoverflow.com/questions/65282181/how-to-use-jest-for-testing-a-react-component-with-localstorage
const localStorageMock = (function() {
  let store: {[key: string]: string} = {};

  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: any) {
      store[key] = String(value);
    },
    removeItem: function(key: string) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  }
})();

export const enableLocalStorageMock = () => Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
export const enableMatchMedia = () => Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
