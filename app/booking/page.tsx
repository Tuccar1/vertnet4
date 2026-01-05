import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QuoteCalculator from '@/components/QuoteCalculator'

export const metadata: Metadata = {
  title: 'Calculateur de Devis Gratuit - Estimation Instantanée | Vertnetgeneve',
  description: 'Obtenez une estimation instantanée et personnalisée pour vos services de nettoyage à Genève. Calculateur de devis interactif et gratuit pour tous nos services.',
  keywords: 'calculateur devis nettoyage, estimation nettoyage, devis gratuit nettoyage Genève, prix nettoyage, tarif nettoyage professionnel',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Calculateur de Devis - Vertnetgeneve',
    description: 'Obtenez une estimation instantanée et personnalisée pour vos services de nettoyage à Genève. Calculateur de devis interactif.',
    url: 'https://www.vertnetgeneve.ch/booking',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Calculateur de Devis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur de Devis - Vertnetgeneve',
    description: 'Obtenez une estimation instantanée pour vos services de nettoyage.',
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
    canonical: 'https://www.vertnetgeneve.ch/booking',
  },
}

export default function BookingPage() {
  return (
    <>
      <Navigation />
      <QuoteCalculator />
      <Footer />
    </>
  )
}

