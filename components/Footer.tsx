"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container-max px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Just Summit home">
              <Image
                src="/Summit-Icon.svg"
                alt=""
                width={36}
                height={36}
                aria-hidden="true"
              />
              <span className="text-xl font-semibold tracking-tight text-white">
                Summit
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/62">
              Headphones built to save the ideas worth keeping. Preorders are secured by Stripe and covered by a 30-day money-back guarantee.
            </p>
            <p className="mt-3 text-xs leading-5 text-white/42">
              Just Summit Ltd · Registered in England · Company no. 15449136
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/62">
              <li>
                <Link href="/#product" className="transition hover:text-white">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="transition hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition hover:text-white">
                  Preorder
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/62">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:hello@justsummit.co" className="transition hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="transition hover:text-white">
                  Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/46">
          Patent pending. © {currentYear} Just Summit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
