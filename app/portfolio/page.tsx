import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortfolioGallery from '@/components/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Portfolio - Nos Réalisations et Témoignages | Vertnetgeneve',
  description: 'Découvrez le portfolio de Vertnetgeneve: nos réalisations de nettoyage professionnel, projets réussis et témoignages clients satisfaits à Genève.',
  keywords: 'portfolio nettoyage, réalisations nettoyage, projets nettoyage, témoignages clients nettoyage, exemples nettoyage professionnel',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Portfolio - Vertnetgeneve',
    description: 'Découvrez nos réalisations et témoignages clients.',
    url: 'https://www.vertnetgeneve.ch/portfolio',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Vertnetgeneve',
    description: 'Découvrez nos réalisations et témoignages clients.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/portfolio',
  },
}

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      <PortfolioGallery />
      <Footer />
    </>
  )
}

