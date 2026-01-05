import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesCategories from '@/components/ServicesCategories'

export const metadata: Metadata = {
  title: 'Nos Services de Nettoyage Professionnel à Genève',
  description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Nettoyage résidentiel, commercial et spécialisé. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'services nettoyage Genève, nettoyage résidentiel, nettoyage commercial, nettoyage canapés, nettoyage fin de bail, nettoyage fin de chantier, conciergerie, nettoyage immeubles, nettoyage bureaux, nettoyage toiture, nettoyage vitres, nettoyage façade',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Nos Services de Nettoyage Professionnel - Vertnetgeneve',
    description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Résidentiels, Commerciaux et Spécialisés.',
    url: 'https://www.vertnetgeneve.ch/services',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Services - Vertnetgeneve',
    description: 'Découvrez tous nos services de nettoyage professionnel à Genève.',
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
    canonical: 'https://www.vertnetgeneve.ch/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <ServicesCategories />
      <Footer />
    </>
  )
}

