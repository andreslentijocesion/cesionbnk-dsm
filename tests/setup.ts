import '@testing-library/jest-dom';

// Suppress noisy console.error from Radix UI in tests

// Suppress noisy console.error from Radix UI in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Not implemented') ||
        args[0].includes('ResizeObserver'))
    ) return;
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
