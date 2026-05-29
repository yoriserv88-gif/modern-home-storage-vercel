import { Users, Target, Award, Zap } from 'lucide-react'
import Image from 'next/image'

const strengths = [
  {
    icon: Users,
    title: "Expert Team",
    description: "50+ skilled craftsmen with 10+ years experience"
  },
  {
    icon: Target,
    title: "Quality Control",
    description: "3-stage inspection process ensuring premium quality"
  },
  {
    icon: Award,
    title: "Advanced Technology",
    description: "Modern CNC machines and automated production lines"
  },
  {
    icon: Zap,
    title: "R&D Innovation",
    description: "Dedicated R&D team for product development"
  }
]

export default function FactoryStrength() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Factory Strength
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern manufacturing facility with advanced capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((strength) => (
            <div
              key={strength.title}
              className="text-center p-6 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                <strength.icon size={28} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {strength.title}
              </h3>
              <p className="text-gray-600">
                {strength.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/factory-img/Strength.jpg"
              alt="Factory Strength Statistics"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}