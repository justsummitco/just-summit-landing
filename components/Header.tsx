'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/Summit-Icon.svg"
                alt="Summit Logo"
                width={40}
                height={40}
                className="transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Summit</span>
              <span className="text-xs text-gray-500 -mt-1">AI Audio Learning</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/#pricing" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/#story" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Our Story
            </Link>
            <Link 
              href="/#testimonials" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Reviews
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary px-6 py-2 text-sm font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}