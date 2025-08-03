import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Pricing from "@/components/Pricing";

// Mock the slots data
jest.mock("@/lib/slots", () => ({
  getSlotData: jest.fn(() =>
    Promise.resolve({
      advancedRemaining: 0,
      proRemaining: 0,
      advancedTotal: 25,
      proTotal: 25,
      lastUpdated: new Date().toISOString(),
    })
  ),
}));

// Mock image imports to ensure alt text is rendered
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

describe("Pricing Component", () => {
  test("should display correct slot counts", async () => {
    render(<Pricing />);

    await waitFor(() => {
      expect(screen.getByText("0/25")).toBeInTheDocument();
    });
  });

  test("should highlight key benefits with bold text", async () => {
    render(<Pricing />);

    await waitFor(() => {
      const lifetimeDiscountText = screen.getByText(
        /20% lifetime software discount/
      );
      expect(lifetimeDiscountText).toHaveClass("font-semibold");
    });
  });

  test("should display BNPL options correctly", async () => {
    render(<Pricing />);

    await waitFor(() => {
      // Using regex to match the BNPL text, accounting for potential variations in spacing or formatting
      expect(screen.getByText(/Or 4 payments of £12\.25/)).toBeInTheDocument();
      expect(screen.getByText(/Or 4 payments of £24\.75/)).toBeInTheDocument();
      expect(screen.getByAltText("Klarna")).toBeInTheDocument();
      expect(screen.getByAltText("Clearpay")).toBeInTheDocument();
    });
  });

  test("should show Genesis 50 badge for both tiers", async () => {
    render(<Pricing />);

    await waitFor(() => {
      const badges = screen.getAllByText(/Genesis 50 badge/);
      expect(badges).toHaveLength(2); // One for each tier
    });
  });

  test("should display correct pricing for both tiers", async () => {
    render(<Pricing />);

    await waitFor(() => {
      expect(screen.getByText("£49")).toBeInTheDocument();
      expect(screen.getByText("£99")).toBeInTheDocument();
    });
  });

  test("should show money-back guarantee", async () => {
    render(<Pricing />);

    await waitFor(() => {
      const guarantees = screen.getAllByText(/30-day money-back guarantee/);
      expect(guarantees.length).toBeGreaterThan(0);
    });
  });

  test("should display secure payment messaging", async () => {
    render(<Pricing />);

    await waitFor(() => {
      const securePayment = screen.getAllByText(/Secure payment via Stripe/);
      expect(securePayment.length).toBeGreaterThan(0);
    });
  });
});

