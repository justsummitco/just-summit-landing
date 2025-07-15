'use client'

import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showModal, setShowModal] = useState(false)

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="container-max section-padding">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg mr-3"></div>
              <span className="text-xl font-bold">Just Summit</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              AI-powered audio learning that transforms podcasts and audiobooks into 
              bite-sized summaries designed for ADHD brains and better retention.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {/* ... existing social links ... */}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button 
                  onClick={() => setShowModal(true)} 
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          {/* ... existing bottom bar ... */}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            Made with ❤️ for ADHD brains and audio learners everywhere
          </p>
          <div className="flex justify-center items-center space-x-4 mt-2 text-xs text-gray-600">
            <span>🧠 ADHD-Friendly Design</span>
            <span>•</span>
            <span>♿ WCAG AA Compliant</span>
            <span>•</span>
            <span>🔒 Privacy-First</span>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Us</h2>
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full border rounded px-3 py-2"
              ></textarea>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 text-sm font-medium"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}