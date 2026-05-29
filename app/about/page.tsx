import { Users, Target, Globe, Award } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide premium, functional home storage solutions that enhance living spaces worldwide"
    },
    {
      icon: Users,
      title: "Our Team",
      description: "50+ skilled craftsmen and designers dedicated to quality and innovation"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving customers in 50+ countries with reliable shipping and support"
    },
    {
      icon: Award,
      title: "Quality Commitment",
      description: "ISO 9001 certified manufacturing with rigorous quality control"
    }
  ]

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/banners/about-banner.jpg"
          alt="About Hiskiwuu Household"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              A leading manufacturer of modern home storage solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Hiskiwuu Household
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A leading manufacturer of modern home storage solutions with 10+ years of expertise in metal and wood craftsmanship
          </p>
        </div>

        {/* Company Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2013, Hiskiwuu Household began as a small workshop specializing in metal fabrication. 
                  Over the years, we've grown into a modern manufacturing facility serving global customers.
                </p>
                <p>
                  Our focus has always been on creating functional, aesthetically pleasing storage solutions 
                  that simplify daily life. We combine traditional craftsmanship with modern technology to 
                  produce products that stand the test of time.
                </p>
                <p>
                  Today, we're proud to be a trusted partner for major retailers and individual customers 
                  seeking premium home organization products.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 lg:h-96 overflow-hidden">
              <Image
                src="/images/factory-img/factory.jpg"
                alt="Our Factory"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                  <value.icon size={28} className="text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing Capabilities */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Manufacturing Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Square Feet Facility</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Production Machines</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">5,000+</div>
              <div className="text-gray-600">Monthly Production Capacity</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-black text-white rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Work With Us?
            </h3>
            <p className="text-gray-200 mb-6">
              Whether you're a retailer, distributor, or individual customer, we're here to help with your storage needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/service"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}