import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.isBestSeller && (
          <div className="absolute top-3 left-3">
            <span className="bg-black text-white text-xs px-2 py-1 rounded">
              Best Seller
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {product.category.replace('-', ' ')}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <span className="text-gray-500 text-sm w-20">Material:</span>
            <span className="text-gray-900 font-medium">{product.material}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm w-20">Size:</span>
            <span className="text-gray-900 font-medium">{product.size}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm w-20">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase().includes('black') ? '#1a1a1a' : 
                    color.toLowerCase().includes('white') ? '#ffffff' : 
                    color.toLowerCase().includes('gray') ? '#8a8a8a' : '#f5f5f5' }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            href={`/products/${product.id}`}
            className="text-black font-medium hover:text-gray-700 transition-colors"
          >
            View Details →
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="flex items-center space-x-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Inquire</span>
          </Link>
        </div>
      </div>
    </div>
  )
}