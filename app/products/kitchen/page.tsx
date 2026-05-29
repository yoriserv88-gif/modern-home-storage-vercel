import Image from 'next/image'
import Link from 'next/link'
import CategoryFilter from '@/components/CategoryFilter'

export default function KitchenProductsPage() {
  const kitchenProducts = [
    { src: '/images/kitchen&dining-img/kitchen-1.jpg', alt: 'Kitchen Storage 1' },
    { src: '/images/kitchen&dining-img/kitchen-2.jpg', alt: 'Kitchen Storage 2' },
    { src: '/images/kitchen&dining-img/kitchen-3.jpg', alt: 'Kitchen Storage 3' },
    { src: '/images/kitchen&dining-img/kitchen-4.jpg', alt: 'Kitchen Storage 4' },
    { src: '/images/kitchen&dining-img/kitchen-5.jpg', alt: 'Kitchen Storage 5' },
    { src: '/images/kitchen&dining-img/kitchen-6.jpg', alt: 'Kitchen Storage 6' },
    { src: '/images/kitchen&dining-img/kitchen-7.jpg', alt: 'Kitchen Storage 7' },
    { src: '/images/kitchen&dining-img/kitchen-8.jpg', alt: 'Kitchen Storage 8' },
  ]

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/kitchen-banner.jpg"
          alt="Kitchen Storage Solutions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Kitchen Storage
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Premium kitchen organization solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kitchenProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative">
                <Image
                  src={product.src}
                  alt={product.alt}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-center items-center">
                <h3 className="text-gray-900 mb-2 text-center line-clamp-1">
                  Wholesale New Design Metal Kitchen Rag Storage Rack Single Tier Under Sink Shelf Soap Sponge Drain Rack
                </h3>
                <div className="space-y-1 text-center">
                  <p className="text-2xl font-bold text-gray-900">$3.80</p>
                  <p className="text-sm text-gray-600">Min. Order: 147 pieces</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}