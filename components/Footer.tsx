import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig, socialLinks } from '@/data/content'

export default function Footer() {
  const footerLinks = {
    Products: [
      { name: 'Kitchen Storage', href: '/products/kitchen' },
      { name: 'Bathroom Storage', href: '/products/bathroom' },
      { name: 'Office Storage', href: '/products/office' },
      { name: 'Living Room Storage', href: '/products/living-room' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/service' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    Support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Warranty', href: '/warranty' },
    ]
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">IS</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{siteConfig.name}</span>
            </div>
            <p className="text-gray-600">{siteConfig.slogan}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-500 hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name === 'Facebook' && <Facebook size={20} />}
                  {social.name === 'Instagram' && <Instagram size={20} />}
                  {social.name === 'LinkedIn' && <Linkedin size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-500 mt-1" />
                <span className="text-gray-600">{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-500" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-600 hover:text-black">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-500" />
                <a href={`tel:${siteConfig.contact.whatsapp}`} className="text-gray-600 hover:text-black">
                  {siteConfig.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-500 hover:text-black text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-black text-sm">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-black text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}