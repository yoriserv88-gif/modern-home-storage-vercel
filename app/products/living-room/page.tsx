import Image from 'next/image'
import CategoryFilter from '@/components/CategoryFilter'

export default function LivingRoomProductsPage() {
  const livingRoomProducts = [
    { src: '/images/livingroom-img/living-1.jpg', alt: 'Living Room Storage 1' },
    { src: '/images/livingroom-img/living-2.jpg', alt: 'Living Room Storage 2' },
    { src: '/images/livingroom-img/living-3.jpg', alt: 'Living Room Storage 3' },
    { src: '/images/livingroom-img/living-4.jpg', alt: 'Living Room Storage 4' },
    { src: '/images/livingroom-img/living-5.jpg', alt: 'Living Room Storage 5' },
    { src: '/images/livingroom-img/living-6.jpg', alt: 'Living Room Storage 6' },
    { src: '/images/livingroom-img/living-7.jpg', alt: 'Living Room Storage 7' },
    { src: '/images/livingroom-img/living-8.jpg', alt: 'Living Room Storage 8' },
  ]

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/living-room-banner.jpg"
          alt="Living Room Storage Solutions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Living Room Storage
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Premium living room organization solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {livingRoomProducts.map((product, index) => (
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
                  {index === 0 ? 'Modern Floating Shelf Set' :
                   index === 1 ? 'Wall Mounted Display Rack' :
                   index === 2 ? 'Vinyl Record Storage Holder' :
                   index === 3 ? 'TV Stand with Storage' :
                   index === 4 ? 'Living Room Storage Cabinet' :
                   index === 5 ? 'Wall Mounted Book Shelf' :
                   index === 6 ? 'Display Stand Organizer' :
                   'Living Room Storage Unit'}
                </h3>
                <div className="space-y-1 text-center">
                  <p className="text-2xl font-bold text-gray-900">$34.99</p>
                  <p className="text-sm text-gray-600">Min. Order: 60 pieces</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}