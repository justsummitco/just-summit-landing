import React from "react";
import { render, screen } from "@testing-library/react";
import BlogIndex, { metadata } from "@/app/blog/page";

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
  default: ({ alt, priority, ...props }: { alt: string; priority?: boolean }) => (
    <img alt={alt} {...props} />
  ),
}));

describe("BlogIndex", () => {
  test("uses the root title template without repeating the brand", () => {
    expect(metadata.title).toBe("Blog");
  });

  test("ends with the email-first funnel and keeps reservation secondary", () => {
    render(<BlogIndex />);

    expect(screen.getByTestId("founding-list-form-blog_index")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View the £49 reservation/i })
    ).toHaveAttribute("href", "/#pricing");
    expect(
      screen.queryByRole("link", { name: /Preorder Just Summit Headphones/i })
    ).not.toBeInTheDocument();
  });
});
