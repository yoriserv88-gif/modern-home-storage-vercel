import Image from 'next/image'
import CategoryFilter from '@/components/CategoryFilter'

export default function BathroomProductsPage() {
  const bathroomProducts = [
    { src: '/images/bathroom-img/bath-1.jpg', alt: 'Bathroom Storage 1' },
    { src: '/images/bathroom-img/bath-2.jpg', alt: 'Bathroom Storage 2' },
    { src: '/images/bathroom-img/bath-3.jpg', alt: 'Bathroom Storage 3' },
    { src: '/images/bathroom-img/bath-4.jpg', alt: 'Bathroom Storage 4' },
    { src: '/images/bathroom-img/bath-5.jpg', alt: 'Bathroom Storage 5' },
    { src: '/images/bathroom-img/bath-6.jpg', alt: 'Bathroom Storage 6' },
  ]

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/bathroom-banner.jpg"
          alt="Bathroom Storage Solutions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Bathroom Storage
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Premium bathroom organization solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bathroomProducts.map((product, index) => (
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
                  {index === 0 ? 'Modern Wall Mounted Towel Rack' :
                   index === 1 ? 'Shower Caddy Organizer' :
                   index === 2 ? 'Bathroom Shelf Storage' :
                   index === 3 ? 'Vanity Organizer Set' :
                   index === 4 ? 'Bathroom Storage Basket' :
                   'Towel Rack with Shelf'}
                </h3>
                <div className="space-y-1 text-center">
                  <p className="text-2xl font-bold text-gray-900">$24.99</p>
                  <p className="text-sm text-gray-600">Min. Order: 50 pieces</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}