'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/data/content'

export default function CategoryFilter() {
  const pathname = usePathname()
  const currentCategory = pathname.split('/')[2] // 获取当前分类

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            pathname === '/products' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/${category.id}`}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              currentCategory === category.id
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}