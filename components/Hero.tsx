'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { siteConfig } from '@/data/content'

const banners = [
  {
    id: 1,
    title: "Modern Kitchen Organization",
    subtitle: "Premium Metal & Wood Storage Solutions for Your Home",
    cta: "Shop Now",
    image: "/images/banners/home-banner-1.jpg",
    bgColor: "bg-gray-900"
  },
  {
    id: 2,
    title: "Custom OEM/ODM Services",
    subtitle: "Tailored Storage Solutions for Your Brand",
    cta: "Get Quote",
    image: "/images/banners/home-banner-2.jpg",
    bgColor: "bg-gray-800"
  },
  {
    id: 3,
    title: "10+ Years Manufacturing Experience",
    subtitle: "Professional Home Storage Products Manufacturer",
    cta: "Learn More",
    image: "/images/banners/home-banner-3.jpg",
    bgColor: "bg-gray-900"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  // 状态管理：当前展开的分类
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // 分类数据
  const categories = [
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      icon: '🍽️', 
      color: 'bg-white', 
      href: '/products/kitchen',
      products: [
        { src: '/images/kitchen&dining-img/kitchen-1.jpg', alt: 'Kitchen Product 1', name: 'Kitchen Storage Rack', price: '$3.80' },
        { src: '/images/kitchen&dining-img/kitchen-2.jpg', alt: 'Kitchen Product 2', name: 'Dish Drying Rack', price: '$4.50' },
        { src: '/images/kitchen&dining-img/kitchen-3.jpg', alt: 'Kitchen Product 3', name: 'Spice Organizer', price: '$5.20' },
        { src: '/images/kitchen&dining-img/kitchen-4.jpg', alt: 'Kitchen Product 4', name: 'Sink Shelf', price: '$6.80' }
      ]
    },
    { 
      id: 'bathroom', 
      name: 'Bathroom', 
      icon: '🚿', 
      color: 'bg-white', 
      href: '/products/bathroom',
      products: [
        { src: '/images/bathroom-img/bath-1.jpg', alt: 'Bathroom Product 1', name: 'Towel Rack', price: '$24.99' },
        { src: '/images/bathroom-img/bath-2.jpg', alt: 'Bathroom Product 2', name: 'Shower Caddy', price: '$19.99' },
        { src: '/images/bathroom-img/bath-3.jpg', alt: 'Bathroom Product 3', name: 'Bathroom Shelf', price: '$22.50' },
        { src: '/images/bathroom-img/bath-4.jpg', alt: 'Bathroom Product 4', name: 'Vanity Organizer', price: '$27.99' }
      ]
    },
    { 
      id: 'office', 
      name: 'Office', 
      icon: '💼', 
      color: 'bg-white', 
      href: '/products/office',
      products: [
        { src: '/images/office-img/office-1.jpg', alt: 'Office Product 1', name: 'Desk Organizer', price: '$29.99' },
        { src: '/images/office-img/office-2.jpg', alt: 'Office Product 2', name: 'Cable Management', price: '$18.50' },
        { src: '/images/office-img/office-3.jpg', alt: 'Office Product 3', name: 'Monitor Stand', price: '$34.99' },
        { src: '/images/office-img/office-4.jpg', alt: 'Office Product 4', name: 'File Organizer', price: '$22.80' }
      ]
    },
    { 
      id: 'living-room', 
      name: 'Living Room', 
      icon: '🛋️', 
      color: 'bg-white', 
      href: '/products/living-room',
      products: [
        { src: '/images/livingroom-img/living-1.jpg', alt: 'Living Room Product 1', name: 'Floating Shelf', price: '$34.99' },
        { src: '/images/livingroom-img/living-2.jpg', alt: 'Living Room Product 2', name: 'Display Rack', price: '$29.50' },
        { src: '/images/livingroom-img/living-3.jpg', alt: 'Living Room Product 3', name: 'Record Holder', price: '$26.80' },
        { src: '/images/livingroom-img/living-4.jpg', alt: 'Living Room Product 4', name: 'TV Stand', price: '$42.99' }
      ]
    }
  ]

  // 处理分类点击
  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null) // 如果已经展开，则关闭
    } else {
      setExpandedCategory(categoryId) // 展开新的分类
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Banner Slider */}
      <div className="relative h-[500px] md:h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className={`absolute inset-0 ${banner.bgColor} opacity-70`} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  {banner.subtitle}
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  {banner.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Categories with Expandable Products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col">
              {/* Category Card */}
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={`${category.color} rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 ${
                  expandedCategory === category.id ? 'rounded-b-none' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="text-gray-500">
                    {expandedCategory === category.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">
                  {category.name} Storage
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {expandedCategory === category.id ? 'Click to collapse' : 'Click to view products'}
                </p>
              </button>

              {/* Expanded Products Section */}
              {expandedCategory === category.id && (
                <div className="bg-white rounded-b-lg shadow-lg border-t border-gray-100 p-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {category.products.map((product, index) => (
                      <div key={index} className="text-center">
                        <div className="relative w-full h-32 mb-2 overflow-hidden rounded-md">
                          <Image
                            src={product.src}
                            alt={product.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-lg font-bold text-gray-900">{product.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All Products Button */}
                  <Link
                    href={category.href}
                    className="block w-full bg-black text-white text-center py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                  >
                    View All {category.name} Products →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}