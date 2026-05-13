import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    fill,
    priority,
    sizes,
    ...props
  }: {
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }) => <img alt={alt} {...props} />,
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  test("shows the canonical headphones presale offer", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /AI headphones that turn listening into recall/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Preorder for £249/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("£49").length).toBeGreaterThan(0);
    expect(screen.getAllByText("today").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Balance due 60 days pre-ship/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Estimated delivery Q4 2026/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Planned capture, transcription, and structured summaries/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Studio product view of the Just Summit headphones/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Three-quarter view of the Just Summit headphones/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Close-up detail of the Just Summit headphones/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/investor/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/brevo/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Presale now open/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear product details\. Clear preorder terms\./i)).toBeInTheDocument();
  });

  test("opens mobile navigation for smaller-screen wayfinding", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("button", { name: /Open navigation menu/i }));

    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });

    expect(mobileNav).toBeInTheDocument();
    expect(mobileNav).toHaveTextContent("Product");
    expect(mobileNav).toHaveTextContent("Blog");
  });

  test("posts only the offer ID when starting full-payment checkout", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Stripe price is not configured" }),
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<HomePage />);
    fireEvent.click(screen.getByTestId("checkout-headphones-full-hero"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/create-checkout-session",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            offerId: "headphones-full",
            source: "hero_primary",
          }),
        })
      );
    });
    expect(
      await screen.findByText(/Checkout is not available right now/i)
    ).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test("submits headphone waitlist leads to the subscribe API", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: "You're on the Just Summit updates list.",
      }),
    });

    render(<HomePage />);
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Tom" },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "tom@example.com" },
    });
    fireEvent.click(screen.getByTestId("waitlist-submit"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/subscribe",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "Tom",
            email: "tom@example.com",
            source: "homepage_waitlist",
          }),
        })
      );
    });
    expect(
      await screen.findByText(/You're on the Just Summit updates list/i)
    ).toBeInTheDocument();
  });
});
