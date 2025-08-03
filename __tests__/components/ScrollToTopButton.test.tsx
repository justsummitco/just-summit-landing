import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Create a simple ScrollToTopButton component for testing
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-800 transition-all z-50"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </>
  );
};

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: mockScrollTo,
  writable: true,
});

describe("ScrollToTopButton", () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    // Reset scroll position
    Object.defineProperty(window, "pageYOffset", {
      value: 0,
      writable: true,
    });
  });

  test("should not be visible initially", () => {
    render(<ScrollToTopButton />);

    const button = screen.queryByLabelText("Scroll to top");
    expect(button).not.toBeInTheDocument();
  });

  test("should appear when scrolled down 400px", async () => {
    render(<ScrollToTopButton />);

    // Simulate scroll down
    Object.defineProperty(window, "pageYOffset", {
      value: 450,
      writable: true,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByLabelText("Scroll to top");
      expect(button).toBeInTheDocument();
    });
  });

  test("should disappear when scrolled back to top", async () => {
    render(<ScrollToTopButton />);

    // First scroll down to make button appear
    Object.defineProperty(window, "pageYOffset", {
      value: 450,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
    });

    // Then scroll back to top
    Object.defineProperty(window, "pageYOffset", {
      value: 0,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
    });
  });

  test("should call window.scrollTo when clicked", async () => {
    render(<ScrollToTopButton />);

    // Make button visible
    Object.defineProperty(window, "pageYOffset", {
      value: 450,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByLabelText("Scroll to top");
      expect(button).toBeInTheDocument();
    });

    const button = screen.getByLabelText("Scroll to top");
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("should have proper accessibility attributes", async () => {
    render(<ScrollToTopButton />);

    // Make button visible
    Object.defineProperty(window, "pageYOffset", {
      value: 450,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByLabelText("Scroll to top");
      expect(button).toHaveAttribute("aria-label", "Scroll to top");
    });
  });
});

