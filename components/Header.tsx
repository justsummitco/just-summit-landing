"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
      <div className="container-max">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="Just Summit home">
            <Image
              src="/just-summit-logo.png"
              alt="Just Summit"
              width={132}
              height={34}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <Link href="/#product" className="transition hover:text-gray-950">
              Product
            </Link>
            <Link href="/#how-it-works" className="transition hover:text-gray-950">
              How it works
            </Link>
            <Link href="/#pricing" className="transition hover:text-gray-950">
              Preorder
            </Link>
            <Link href="/blog" className="transition hover:text-gray-950">
              Blog
            </Link>
          </nav>

          <Link
            href="/#pricing"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Preorder
          </Link>
        </div>
      </div>
    </header>
  );
}
