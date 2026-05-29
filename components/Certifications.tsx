import { CheckCircle } from 'lucide-react'
import { certifications } from '@/data/content'

export default function Certifications() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certifications & Standards
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We adhere to the highest quality and ethical standards in manufacturing
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mb-4">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}