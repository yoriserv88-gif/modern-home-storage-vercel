import Image from 'next/image'
import CategoryFilter from '@/components/CategoryFilter'

export default function OfficeProductsPage() {
  const officeProducts = [
    { src: '/images/office-img/office-1.jpg', alt: 'Office Storage 1' },
    { src: '/images/office-img/office-2.jpg', alt: 'Office Storage 2' },
    { src: '/images/office-img/office-3.jpg', alt: 'Office Storage 3' },
    { src: '/images/office-img/office-4.jpg', alt: 'Office Storage 4' },
    { src: '/images/office-img/office-5.jpg', alt: 'Office Storage 5' },
    { src: '/images/office-img/office-6.jpg', alt: 'Office Storage 6' },
    { src: '/images/office-img/office-7.jpg', alt: 'Office Storage 7' },
    { src: '/images/office-img/office-8.jpg', alt: 'Office Storage 8' },
  ]

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/office-banner.jpg"
          alt="Office Storage Solutions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Office Storage
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Premium office organization solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {officeProducts.map((product, index) => (
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
                  {index === 0 ? 'Modern Desk Organizer Set' :
                   index === 1 ? 'Under Desk Cable Management Tray' :
                   index === 2 ? 'Monitor Stand with Storage' :
                   index === 3 ? 'Desktop Storage Rack' :
                   index === 4 ? 'Office File Organizer' :
                   index === 5 ? 'Wire Management System' :
                   index === 6 ? 'Office Supply Organizer' :
                   'Desk Cable Organizer'}
                </h3>
                <div className="space-y-1 text-center">
                  <p className="text-2xl font-bold text-gray-900">$29.99</p>
                  <p className="text-sm text-gray-600">Min. Order: 75 pieces</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}