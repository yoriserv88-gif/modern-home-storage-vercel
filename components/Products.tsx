'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ErrorBoundary from './ErrorBoundary'

interface PromotionImage {
  src: string
  alt: string
}

export default function Products() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const promotionImages: PromotionImage[] = [
    { src: '/images/amz promotion/lazy-susan-1.jpg', alt: 'Lazy Susan 1' },
    { src: '/images/amz promotion/lazy-susan-2.jpg', alt: 'Lazy Susan 2' },
    { src: '/images/amz promotion/lazy-susan-3.jpg', alt: 'Lazy Susan 3' },
    { src: '/images/amz promotion/lazy-susan-4.jpg', alt: 'Lazy Susan 4' },
    { src: '/images/amz promotion/lazy-susan-5.jpg', alt: 'Lazy Susan 5' },
    { src: '/images/amz promotion/lazy-susan-6.jpg', alt: 'Lazy Susan 6' },
    { src: '/images/amz promotion/lazy-susan-7.jpg', alt: 'Lazy Susan 7' },
  ]

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
    setImageErrors(prev => {
      const newErrors = new Set(prev)
      newErrors.delete(src)
      return newErrors
    })
  }

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set(prev).add(src))
  }

  const ProductImage = ({ image, index }: { image: PromotionImage; index: number }) => {
    const isLoaded = loadedImages.has(image.src)
    const hasError = imageErrors.has(image.src)

    if (hasError) {
      return (
        <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Image not available</p>
        </div>
      )
    }

    return (
      <div className="relative">
        <Image
          src={image.src}
          alt={image.alt}
          width={300}
          height={300}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(image.src)}
          onError={() => handleImageError(image.src)}
        />
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-black text-white text-xs px-2 py-1 rounded">
            Deals
          </span>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Promotion On Amazon
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promotionImages.map((image, index) => (
            <ErrorBoundary
              key={index}
              fallback={
                <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 flex flex-col items-center justify-center min-h-[300px]">
                  <p className="text-gray-500">Failed to load product</p>
                </div>
              }
            >
              <div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <ProductImage image={image} index={index} />
                <div className="p-4 flex-grow flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Lazy Susan Organizer</h3>
                  <div className="space-y-1 text-sm text-center">
                    <p className="text-gray-500 line-through">Original price: $27.99</p>
                    <p className="text-red-600 font-bold">Discount price: $19.99</p>
                    <p className="text-green-600 font-medium">Discount: 40%</p>
                    <p className="text-gray-700 mt-2">Discount code: <span className="font-mono font-bold bg-gray-100 px-1 rounded">DZGOQYJF</span></p>
                  </div>
                </div>
              </div>
            </ErrorBoundary>
          ))}
          {/* Shop Now Button - Last item in grid */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center p-4">
            <a
              href="https://www.amazon.com/gp/product/B0CKT6KMX4"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white rounded-md px-6 py-3 flex items-center justify-center gap-2 font-semibold hover:bg-gray-800 transition-colors"
            >
              <span>Shop Now on Amazon</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}