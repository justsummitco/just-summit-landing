"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import FoundingListLink from "@/components/FoundingListLink";
import type { FoundingListSource } from "@/lib/founding-list";

type HeaderProps = {
  active?: "home" | "about" | "blog";
  variant?: "fixed" | "sticky";
  foundingListHref?: string;
  foundingListSource?: FoundingListSource;
};

const navItems = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "ADHD notes", href: "/adhd-meeting-notes" },
  { label: "Preorder", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about", active: "about" },
  { label: "Blog", href: "/blog", active: "blog" },
] as const;

export default function Header({
  active = "home",
  variant = "sticky",
  foundingListHref = "/founding-list",
  foundingListSource = "home_header",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerPosition =
    variant === "fixed" ? "fixed inset-x-0 top-0" : "sticky top-0";

  return (
    <header className={`${headerPosition} z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl`}>
      <div className="container-max">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="Just Summit home">
            <Image
              src="/just-summit-logo.png"
              alt="Just Summit"
              width={132}
              height={55}
              className="pointer-events-none"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 xl:flex xl:gap-8">
            {navItems.map((item) => {
              const isActive = "active" in item && item.active === active;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition hover:text-gray-950 ${
                    isActive ? "text-gray-950" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <FoundingListLink
              href={foundingListHref}
              source={foundingListSource}
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
            >
              Join the list
            </FoundingListLink>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:border-gray-300 hover:text-gray-950 xl:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-site-navigation"
            aria-label="Mobile navigation"
            className="grid gap-1 border-t border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 xl:hidden"
          >
            {navItems.map((item) => {
              const isActive = "active" in item && item.active === active;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-3 transition hover:bg-gray-100 hover:text-gray-950 ${
                    isActive ? "bg-gray-100 text-gray-950" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
