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

  test("shows the trust-focused headphones presale offer", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /Don't lose the best things you only hear once/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId("checkout-headphones-deposit-hero")).toHaveTextContent(
      /Reserve your place/i
    );
    expect(screen.getAllByText(/Preorder for £249/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£49/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("today").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Balance due 60 days pre-ship/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Estimated delivery Q4 2026/i).length).toBeGreaterThan(0);
    expect(container.querySelector("#roadmap")).toHaveTextContent(/Prototype build/i);
    expect(screen.getByText(/An honest note about the funding model/i)).toBeInTheDocument();
    expect(screen.getByText(/Best value for first batch/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Just Summit Ltd · Registered in England · Company no\. 15449136/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /About/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/Record a full meeting/i)).toBeInTheDocument();
    expect(
      screen.getByAltText(/Studio product view of the Just Summit headphones/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Real photo coming soon/i)).toBeInTheDocument();
    expect(screen.getByText(/Real app preview coming soon/i)).toBeInTheDocument();
    expect(screen.queryByText(/investor/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/brevo/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Founding edition/i)).toBeInTheDocument();
    expect(screen.getByText(/The target spec, stated plainly\./i)).toBeInTheDocument();

    const pricingText = container.querySelector("#pricing")?.textContent ?? "";
    expect(pricingText.indexOf("Save £100 vs retail")).toBeLessThan(
      pricingText.indexOf("Reserve with deposit")
    );
  });

  test("opens mobile navigation for smaller-screen wayfinding", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("button", { name: /Open navigation menu/i }));

    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });

    expect(mobileNav).toBeInTheDocument();
    expect(mobileNav).toHaveTextContent("Product");
    expect(mobileNav).toHaveTextContent("Roadmap");
    expect(mobileNav).toHaveTextContent("About");
    expect(mobileNav).toHaveTextContent("Blog");
  });

  test("posts only the offer ID when starting deposit checkout from the hero", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Stripe price is not configured" }),
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<HomePage />);
    fireEvent.click(screen.getByTestId("checkout-headphones-deposit-hero"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/create-checkout-session",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            offerId: "headphones-deposit",
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
