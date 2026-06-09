'use client'

import { siteConfig } from '@/data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand & Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold">HS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-gray-600">
              Simple & Modern Home Storage | Factory Direct Custom Metal & Wood Organizer
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <div className="space-y-2">
              {/* WhatsApp */}
              <div className="flex items-center space-x-2 group">
                <span className="text-green-600 text-lg">💬</span>
                <a 
                  href="https://wa.me/8613922893247"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  WhatsApp: +86 139 2289 3247
                </a>
              </div>
              
              {/* Email */}
              <div className="flex items-center space-x-2 group">
                <span className="text-blue-600 text-lg">✉️</span>
                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Email: {siteConfig.contact.email}
                </a>
              </div>
              
              {/* Telegram */}
              <div className="flex items-center space-x-2 group">
                <span className="text-blue-400 text-lg">🚀</span>
                <a 
                  href="https://t.me/yori88"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 hover:text-blue-400 transition-colors duration-200"
                >
                  Telegram: @yori88
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-500 text-center">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}