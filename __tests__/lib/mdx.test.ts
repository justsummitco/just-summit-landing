import { stripLeadingTitle } from "@/lib/mdx";

describe("stripLeadingTitle", () => {
  it("removes a duplicated Markdown title after leading whitespace", () => {
    const content = "\n# Example title\n\nOpening paragraph.";
    expect(stripLeadingTitle(content, "Example title")).toBe("Opening paragraph.");
  });

  it("preserves a different first heading", () => {
    const content = "## First section\n\nOpening paragraph.";
    expect(stripLeadingTitle(content, "Example title")).toBe(content);
  });
});
