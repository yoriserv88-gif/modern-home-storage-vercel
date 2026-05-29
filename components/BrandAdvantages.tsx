import { Factory, Settings, Shield, Truck } from 'lucide-react'
import { brandAdvantages } from '@/data/content'

const iconMap = {
  Factory: Factory,
  Settings: Settings,
  Shield: Shield,
  Truck: Truck
}

export default function BrandAdvantages() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            As a professional manufacturer, we provide premium home storage solutions with exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brandAdvantages.map((advantage) => {
            const Icon = iconMap[advantage.icon as keyof typeof iconMap]
            return (
              <div
                key={advantage.title}
                className="text-center p-6 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                  <Icon size={28} className="text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}