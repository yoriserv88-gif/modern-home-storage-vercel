import Image from 'next/image'

export default function NewArrivals() {
  const newProducts = [
    { 
      src: '/images/new-img/new-1.jpg', 
      alt: 'New Product 1',
      name: 'Modern Kitchen Organizer Set',
      price: '$39.99',
      minOrder: '100 pieces'
    },
    { 
      src: '/images/new-img/new-2.jpg', 
      alt: 'New Product 2',
      name: 'Wall Mounted Bathroom Shelf',
      price: '$28.50',
      minOrder: '80 pieces'
    },
    { 
      src: '/images/new-img/new-3.jpg', 
      alt: 'New Product 3',
      name: 'Office Desk Cable Management',
      price: '$24.99',
      minOrder: '120 pieces'
    },
    { 
      src: '/images/new-img/new-4.jpg', 
      alt: 'New Product 4',
      name: 'Living Room Floating Shelf',
      price: '$45.80',
      minOrder: '60 pieces'
    },
    { 
      src: '/images/new-img/new-5.jpg', 
      alt: 'New Product 5',
      name: 'Expandable Dish Drying Rack',
      price: '$32.99',
      minOrder: '150 pieces'
    },
    { 
      src: '/images/new-img/new-6.jpg', 
      alt: 'New Product 6',
      name: 'Bathroom Towel Rack Organizer',
      price: '$26.50',
      minOrder: '90 pieces'
    },
    { 
      src: '/images/new-img/new-7.jpg', 
      alt: 'New Product 7',
      name: 'Modern Office Storage Cabinet',
      price: '$52.99',
      minOrder: '50 pieces'
    },
    { 
      src: '/images/new-img/new-8.jpg', 
      alt: 'New Product 8',
      name: 'Living Room Display Stand',
      price: '$38.80',
      minOrder: '70 pieces'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NEW ARRIVALS
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest factory innovations and modern storage solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newProducts.map((product, index) => (
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
                {/* New标识 - 右上角 */}
                <div className="absolute top-3 right-3">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    New
                  </span>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-center items-center">
                <h3 className="text-gray-900 mb-2 text-center line-clamp-1">
                  {product.name}
                </h3>
                <div className="space-y-1 text-center">
                  <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                  <p className="text-sm text-gray-600">Min. Order: {product.minOrder}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}