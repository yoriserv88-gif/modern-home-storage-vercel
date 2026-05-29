import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/data/content'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.slogan}`,
  description: siteConfig.description,
  keywords: ['home storage', 'kitchen organizer', 'bathroom storage', 'office organizer', 'modern furniture', 'metal storage', 'wood organizer'],
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${roboto.className}`}>
      <body className="min-h-screen bg-white text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}