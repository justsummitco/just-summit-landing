"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import {
  captureFoundingListEvent,
  getFoundingListAttribution,
} from "@/lib/founding-list";
import type { FoundingListSource } from "@/lib/founding-list";

type FoundingListLinkProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  source: FoundingListSource;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function FoundingListLink({
  children,
  className,
  href = "/founding-list",
  source,
  onClick,
}: FoundingListLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    captureFoundingListEvent(
      "founding_list_cta_clicked",
      getFoundingListAttribution(source)
    );
    onClick?.(event);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
