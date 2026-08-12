import React from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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
    window.history.replaceState({}, "", "/");
    global.fetch = jest.fn();
    window.posthog = {
      capture: jest.fn(),
      get_distinct_id: jest.fn(() => "anon_123"),
    };
  });

  test("shows the trust-focused headphones presale offer", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /Don't lose the best things you only hear once/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Join the Founding List/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Reserve a pair for £49/i })).toHaveAttribute("href", "#pricing");
    expect(screen.getAllByText(/Pay in full £249/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£49/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("today").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Balance due 60 days before shipping/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/subject to prototype validation/i).length).toBeGreaterThan(0);
    expect(container.querySelector("#roadmap")).toHaveTextContent(/Prototype build/i);
    expect(screen.getByText(/An honest note about the funding model/i)).toBeInTheDocument();
    expect(screen.getByText(/^Recommended$/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure checkout powered by Stripe/i)).toBeInTheDocument();
    expect(screen.getByText(/Apple Pay, Link, or card where available/i)).toBeInTheDocument();
    expect(screen.getByText(/Preorder updates sent by email/i)).toBeInTheDocument();
    expect(screen.queryByText(/Limited early reservation slots/i)).not.toBeInTheDocument();
    expect(screen.getByText(/When do I pay the remaining balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I update my delivery address later/i)).toBeInTheDocument();
    expect(screen.getByText(/Is shipping included/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Just Summit Ltd · Registered in England · Company no\. 15449136/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /About/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/Record a full meeting/i)).toBeInTheDocument();
    expect(
      screen.getByAltText(/Studio concept render of the Just Summit headphones/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Angled concept render of the Just Summit headphones/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Close-up concept render showing the Just Summit headphones ear cushion and hinge/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/investor/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/brevo/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Prototype stage · Founding List open/i)).toBeInTheDocument();
    expect(screen.getByText(/The target spec, stated plainly\./i)).toBeInTheDocument();

    const pricingText = container.querySelector("#pricing")?.textContent ?? "";
    expect(pricingText.indexOf("Reserve with deposit")).toBeLessThan(
      pricingText.indexOf("Pay in full")
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

  test("tracks the hero Founding List CTA", () => {
    const { container } = render(<HomePage />);
    const heroLink = container.querySelector<HTMLAnchorElement>(
      'a[href="#founding-list-roadmap"]'
    );

    expect(heroLink).not.toBeNull();
    fireEvent.click(heroLink!);

    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "founding_list_cta_clicked",
      expect.objectContaining({
        source: "home_hero",
        page_url: "http://localhost/",
      })
    );
  });

  test("keeps deposit checkout working from the pricing section", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Stripe price is not configured" }),
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<HomePage />);
    fireEvent.click(screen.getByTestId("checkout-headphones-deposit-pricing"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/create-checkout-session",
        expect.objectContaining({
          method: "POST",
          body: expect.any(String),
        })
      );
      const requestBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);

      expect(requestBody).toEqual(
        expect.objectContaining({
          offerId: "headphones-deposit",
          source: "pricing_headphones-deposit",
          payment_type: "deposit",
          placement: "pricing",
          posthog_distinct_id: "anon_123",
          page_url: expect.any(String),
        })
      );
    });
    expect(
      await screen.findByText(/Checkout is not available right now/i)
    ).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test("submits Founding List leads with placement attribution", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: "You're on the Just Summit Founding List. Check your inbox for a welcome email.",
      }),
    });

    render(<HomePage />);
    const roadmapForm = screen.getByTestId("founding-list-form-home_roadmap");

    fireEvent.focus(within(roadmapForm).getByLabelText(/First name/i));
    fireEvent.change(within(roadmapForm).getByLabelText(/First name/i), {
      target: { value: "Tom" },
    });
    fireEvent.change(within(roadmapForm).getByLabelText(/Email address/i), {
      target: { value: "tom@example.com" },
    });
    fireEvent.click(screen.getByTestId("founding-list-submit-home_roadmap"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/subscribe",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "Tom",
            email: "tom@example.com",
            source: "home_roadmap",
            page_url: "http://localhost/",
          }),
        })
      );
    });
    expect(
      await screen.findByText(/You're on the Just Summit Founding List/i)
    ).toBeInTheDocument();
    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "founding_list_form_started",
      expect.objectContaining({ source: "home_roadmap" })
    );
    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "founding_list_joined",
      expect.objectContaining({ source: "home_roadmap" })
    );
  });

  test("shows and tracks Founding List submission failures", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email service is not configured" }),
    });

    render(<HomePage />);
    const footerForm = screen.getByTestId("founding-list-form-home_footer");

    fireEvent.change(within(footerForm).getByLabelText(/Email address/i), {
      target: { value: "tom@example.com" },
    });
    fireEvent.click(screen.getByTestId("founding-list-submit-home_footer"));

    expect(
      await within(footerForm).findByRole("alert")
    ).toHaveTextContent("Email service is not configured");
    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "founding_list_failed",
      expect.objectContaining({
        source: "home_footer",
        error_message: "Email service is not configured",
      })
    );
  });
});
