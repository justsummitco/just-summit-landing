import { render, screen } from "@testing-library/react";
import MarkdownArticle from "@/components/MarkdownArticle";

describe("MarkdownArticle", () => {
  it("renders safe headings, lists and working links", () => {
    render(
      <MarkdownArticle
        content={[
          "## A useful section",
          "",
          "Read the [internal guide](/meeting-notes-for-adhd) and the [NHS page](https://www.nhs.uk/conditions/adhd-adults/).",
          "",
          "- **Owner:** Tom",
          "- **Deadline:** Friday",
        ].join("\n")}
      />
    );

    expect(screen.getByRole("heading", { level: 2, name: "A useful section" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "internal guide" })).toHaveAttribute("href", "/meeting-notes-for-adhd");
    expect(screen.getByRole("link", { name: "NHS page" })).toHaveAttribute("href", "https://www.nhs.uk/conditions/adhd-adults/");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
