'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CategoryFilter from '@/components/CategoryFilter'
import ProductImageCard from '@/components/ProductImageCard'
import { getPaginatedProductImages } from '@/data/productImages'

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 16
  
  const { products, pagination } = getPaginatedProductImages(currentPage, itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/products-banner.jpg"
          alt="Modern Home Storage Solutions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              All Products
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Browse our complete collection of modern home storage solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter />

        {/* Products Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Showing {products.length} of {pagination.totalItems} products
          </p>
        </div>

        {/* Products Grid - 2行4列布局 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {products.map((item, index) => (
            <ProductImageCard
              key={index}
              product={item.product}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
              className={`px-4 py-2 rounded-md font-medium ${
                pagination.hasPreviousPage
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-md font-medium ${
                      currentPage === pageNum
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-4 py-2 rounded-md font-medium ${
                pagination.hasNextPage
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Custom Solutions?
            </h3>
            <p className="text-gray-600 mb-6">
              We offer OEM/ODM services with custom sizes, colors, and branding
            </p>
            <a
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              Request Custom Quote
            </a>
          </div>
        </div>
      </div>
    </>
  )
}