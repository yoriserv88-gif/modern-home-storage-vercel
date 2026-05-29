import { Package, Settings, Truck, Headphones, FileText, Shield } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    icon: Settings,
    title: "OEM/ODM Custom",
    description: "Custom size, color, logo, and packaging solutions tailored to your brand",
    features: [
      "Custom product design and development",
      "Brand logo printing and packaging",
      "Material and finish customization",
      "Minimum order quantity: 500 units"
    ]
  },
  {
    icon: Package,
    title: "Sample Service",
    description: "Get physical samples before placing bulk orders",
    features: [
      "Free sample for qualified buyers",
      "3-5 days sample production time",
      "Sample cost refundable on bulk order",
      "Global shipping available"
    ]
  },
  {
    icon: Truck,
    title: "FBA Shipping Service",
    description: "Complete fulfillment solution for Amazon sellers",
    features: [
      "Direct shipping to Amazon FBA warehouses",
      "Product labeling and packaging",
      "Inventory management support",
      "Sea and air freight options"
    ]
  },
  {
    icon: FileText,
    title: "Bulk Order",
    description: "Competitive pricing for wholesale and bulk purchases",
    features: [
      "Volume discounts available",
      "Flexible payment terms",
      "Priority production scheduling",
      "Dedicated account manager"
    ]
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Comprehensive quality control at every stage",
    features: [
      "3-stage inspection process",
      "Material certification provided",
      "ISO 9001 quality management",
      "12-month product warranty"
    ]
  },
  {
    icon: Headphones,
    title: "After-sales Support",
    description: "Reliable customer service and technical support",
    features: [
      "24/7 customer service",
      "Technical documentation",
      "Spare parts availability",
      "Installation guidance"
    ]
  }
]

export default function ServicePage() {
  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/service-banner.jpg"
          alt="Our Services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Comprehensive manufacturing and support services
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive manufacturing and support services for retailers, distributors, and Amazon sellers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4">
                <service.icon size={24} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Process
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-0.5 w-4/5 bg-gray-200 top-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consultation", desc: "Discuss your requirements and specifications" },
                { step: "02", title: "Design & Sample", desc: "Create design and provide samples for approval" },
                { step: "03", title: "Production", desc: "Manufacture products with quality control" },
                { step: "04", title: "Shipping", desc: "Package and ship to your destination" }
              ].map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Project With Us
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you need custom products, bulk orders, or FBA fulfillment, we have the expertise to deliver
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
              >
                Request Quote
              </a>
              <a
                href="mailto:info@hiskiwuu.com"
                className="inline-block border-2 border-black text-black px-8 py-3 rounded-md font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}