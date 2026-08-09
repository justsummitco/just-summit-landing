import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FoundingListPage, { metadata } from "@/app/founding-list/page";

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

describe("FoundingListPage", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/founding-list");
    window.posthog = { capture: jest.fn() };
  });

  test("uses the root title template without repeating the brand", () => {
    expect(metadata.title).toBe("Join the Founding List");
  });

  test("routes the header CTA to the page form with page attribution", () => {
    const { container } = render(<FoundingListPage />);
    const headerCta = screen.getByRole("link", { name: "Join the list" });

    expect(headerCta).toHaveAttribute("href", "#founding-list-form");
    expect(container.querySelector("#founding-list-form")).not.toBeNull();

    fireEvent.click(headerCta);

    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "founding_list_cta_clicked",
      expect.objectContaining({
        source: "founding_list_page",
        page_url: "http://localhost/founding-list",
      })
    );
  });
});
