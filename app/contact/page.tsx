'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react'
import { siteConfig } from '@/data/content'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // 发送到API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert('Thank you for your inquiry! We will contact you soon.')
        
        // 重置表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        })
      } else {
        alert(`Error: ${result.error || 'Failed to submit form'}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // 降级方案：使用mailto链接
      const mailtoLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
      )}`
      window.open(mailtoLink, '_blank')
      alert('Error submitting form. Please try again or contact us directly.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/contact-banner.jpg"
          alt="Contact Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for quotes, samples, or any questions about our products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Get In Touch
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-600 hover:text-black">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone / WhatsApp</h3>
                  <a href={`tel:${siteConfig.contact.whatsapp}`} className="text-gray-600 hover:text-black">
                    {siteConfig.contact.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Factory Address</h3>
                  <p className="text-gray-600">{siteConfig.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM (PST)</p>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm mb-4">
                We typically respond within 2-4 hours during business hours
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Email: Within 4 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">WhatsApp: Within 2 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Quote Requests: Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Inquiry
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-quote">Custom Quote Request</option>
                    <option value="sample-request">Sample Request</option>
                    <option value="bulk-order">Bulk Order Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Please provide details about your inquiry, including product references, quantities, and any specific requirements..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Inquiry Types */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Common Inquiry Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:sales@hiskiwuu.com?subject=Custom%20Product%20Quote"
                  className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition-colors"
                >
                  <div className="font-medium text-gray-900">Custom Product Quote</div>
                  <div className="text-sm text-gray-600">OEM/ODM services</div>
                </a>
                <a
                  href="mailto:samples@hiskiwuu.com?subject=Sample%20Request"
                  className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition-colors"
                >
                  <div className="font-medium text-gray-900">Sample Request</div>
                  <div className="text-sm text-gray-600">Physical product samples</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}