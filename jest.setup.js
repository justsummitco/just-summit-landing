import "@testing-library/jest-dom";

// Mock window.scrollTo for scroll-to-top tests
if (typeof window !== "undefined") {
  Object.defineProperty(window, "scrollTo", {
    value: jest.fn(),
    writable: true,
  });

  // Mock IntersectionObserver for Next Link prefetching in jsdom.
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
    takeRecords = jest.fn(() => []);
  }

  global.IntersectionObserver = MockIntersectionObserver;
  window.IntersectionObserver = MockIntersectionObserver;
}

