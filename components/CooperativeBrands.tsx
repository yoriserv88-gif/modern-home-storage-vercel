import Image from 'next/image'

export default function CooperativeBrands() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/factory-img/partner1.jpg"
            alt="Factory Partnership"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}