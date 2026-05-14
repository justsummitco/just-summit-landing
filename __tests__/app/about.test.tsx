import React from "react";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

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

describe("AboutPage", () => {
  test("renders the credibility-lite about page", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        name: /A small project trying to fix a small frustration/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/We are building Just Summit/i)).toBeInTheDocument();
    expect(screen.getByText(/A few small principles/i)).toBeInTheDocument();
    expect(screen.getByText(/Writing about Just Summit/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email the team/i })).toHaveAttribute(
      "href",
      "mailto:hello@justsummit.co"
    );
    expect(screen.getByRole("link", { name: /press@justsummit.co/i })).toHaveAttribute(
      "href",
      "mailto:press@justsummit.co"
    );
    expect(screen.queryByText(/advisor/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/partner logo/i)).not.toBeInTheDocument();
  });
});
