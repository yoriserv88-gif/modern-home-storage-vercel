'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, Shield, Check } from 'lucide-react'
import { products } from '@/data/products'

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find(p => p.id === params.id) || products[0]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm text-gray-600">
            <a href="/" className="hover:text-black">Home</a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-black">Products</a>
            <span className="mx-2">/</span>
            <a href={`/products/${product.category}`} className="hover:text-black capitalize">
              {product.category.replace('-', ' ')}
            </a>
            <span className="mx-2">/</span>
            <span className="text-black">{product.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative h-96 bg-gray-100 rounded-lg mb-4">
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="flex space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gray-100 rounded border-2 ${
                    index === selectedImage ? 'border-black' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.isBestSeller && (
              <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full mb-4">
                Best Seller
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">Material:</span>
                <span className="text-gray-900">{product.material}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">Size:</span>
                <span className="text-gray-900">{product.size}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">Available Colors:</span>
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.toLowerCase().includes('black') ? '#1a1a1a' : 
                        color.toLowerCase().includes('white') ? '#ffffff' : 
                        color.toLowerCase().includes('gray') ? '#8a8a8a' : '#f5f5f5' }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & CTA */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <span className="text-gray-700 font-medium mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center">
                  <ShoppingBag size={20} className="mr-2" />
                  Add to Inquiry List
                </button>
                <a
                  href="/contact"
                  className="flex-1 border-2 border-black text-black px-6 py-3 rounded-md font-semibold hover:bg-black hover:text-white transition-colors text-center"
                >
                  Request Custom Quote
                </a>
              </div>
            </div>

            {/* Shipping & Warranty */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Truck size={20} className="text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Free Samples</div>
                  <div className="text-sm text-gray-600">For qualified buyers</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck size={20} className="text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Global Shipping</div>
                  <div className="text-sm text-gray-600">FBA available</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">12-Month Warranty</div>
                  <div className="text-sm text-gray-600">Quality guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <a
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gray-100 rounded mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedProduct.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Inquiry CTA */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in This Product?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us for pricing, samples, or custom modifications. Our team will respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              Contact Sales
            </a>
            <a
              href="mailto:samples@hiskiwuu.com"
              className="inline-block border-2 border-black text-black px-8 py-3 rounded-md font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Request Sample
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}