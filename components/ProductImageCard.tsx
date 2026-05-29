import Image from 'next/image'
import { Product } from '@/data/products'

interface ProductImageCardProps {
  product: Product
  imageSrc: string
}

export default function ProductImageCard({ product, imageSrc }: ProductImageCardProps) {
  // 根据产品类别获取对应的图片信息
  const getProductInfo = () => {
    switch (product.category) {
      case 'kitchen':
        return {
          name: 'Wholesale New Design Metal Kitchen Rag Storage Rack Single Tier Under Sink Shelf Soap Sponge Drain Rack',
          price: '$3.80',
          minOrder: '147 pieces'
        }
      case 'bathroom':
        return {
          name: product.title,
          price: '$24.99',
          minOrder: '50 pieces'
        }
      case 'office':
        return {
          name: product.title,
          price: '$29.99',
          minOrder: '75 pieces'
        }
      case 'living-room':
        return {
          name: product.title,
          price: '$34.99',
          minOrder: '60 pieces'
        }
      default:
        return {
          name: product.title,
          price: '$29.99',
          minOrder: '100 pieces'
        }
    }
  }

  const productInfo = getProductInfo()

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-center items-center">
        <h3 className="text-gray-900 mb-2 text-center line-clamp-1">
          {productInfo.name}
        </h3>
        <div className="space-y-1 text-center">
          <p className="text-2xl font-bold text-gray-900">{productInfo.price}</p>
          <p className="text-sm text-gray-600">Min. Order: {productInfo.minOrder}</p>
        </div>
      </div>
    </div>
  )
}