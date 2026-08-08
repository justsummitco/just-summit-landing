import Link from "next/link";
import { Fragment, type ReactNode } from "react";

type MarkdownArticleProps = {
  content: string;
};

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list" | "ordered-list"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "divider" };

const blockStart = /^(?:#{1,3}\s+|[-*]\s+|\d+\.\s+|>\s?|---\s*$)/;
const inlineToken = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;

function parseBlocks(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];

  for (let index = 0; index < lines.length; ) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length >= 3 ? 3 : 2,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^[-*]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^\d+\.\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "blockquote", text: quote.join(" ") });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const nextLine = lines[index].trim();
      if (!nextLine || blockStart.test(nextLine)) break;
      paragraph.push(nextLine);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(inlineToken).filter(Boolean);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (link) {
      const [, label, href] = link;
      const children = renderInline(label, `${key}-label`);

      if (href.startsWith("/") && !href.startsWith("//")) {
        return (
          <Link className="font-medium text-teal-700 underline decoration-teal-200 underline-offset-4 hover:text-teal-900" href={href} key={key}>
            {children}
          </Link>
        );
      }

      if (/^https?:\/\//i.test(href)) {
        return (
          <a className="font-medium text-teal-700 underline decoration-teal-200 underline-offset-4 hover:text-teal-900" href={href} key={key} rel="noreferrer" target="_blank">
            {children}
          </a>
        );
      }

      return <Fragment key={key}>{label}</Fragment>;
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong className="font-semibold text-gray-950" key={key}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-900" key={key}>{part.slice(1, -1)}</code>;
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

export default function MarkdownArticle({ content }: MarkdownArticleProps) {
  return (
    <div>
      {parseBlocks(content).map((block, index) => {
        const key = `block-${index}`;

        if (block.type === "heading") {
          return block.level === 3 ? (
            <h3 className="mb-3 mt-8 text-xl font-semibold text-gray-950" key={key}>{renderInline(block.text, key)}</h3>
          ) : (
            <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl" key={key}>{renderInline(block.text, key)}</h2>
          );
        }

        if (block.type === "unordered-list" || block.type === "ordered-list") {
          const List = block.type === "ordered-list" ? "ol" : "ul";
          return (
            <List className={`mb-6 space-y-2 pl-6 text-lg leading-8 text-gray-700 ${block.type === "ordered-list" ? "list-decimal" : "list-disc"}`} key={key}>
              {block.items.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>)}
            </List>
          );
        }

        if (block.type === "blockquote") {
          return <blockquote className="my-8 border-l-4 border-teal-500 bg-teal-50 px-6 py-5 text-lg leading-8 text-gray-800" key={key}>{renderInline(block.text, key)}</blockquote>;
        }

        if (block.type === "divider") {
          return <hr className="my-10 border-gray-200" key={key} />;
        }

        return <p className="mb-5 text-lg leading-8 text-gray-700" key={key}>{renderInline(block.text, key)}</p>;
      })}
    </div>
  );
}
