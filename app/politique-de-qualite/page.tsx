import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QualityPolicy from '@/components/QualityPolicy'

export const metadata: Metadata = {
  title: 'Politique de Qualité - Engagement Excellence | Vertnetgeneve',
  description: 'Découvrez la politique de qualité de Vertnetgeneve: engagement envers l\'excellence, la durabilité, la satisfaction client à 100% et les pratiques écologiques à Genève.',
  keywords: 'politique qualité nettoyage, qualité nettoyage professionnel, satisfaction client nettoyage, nettoyage écologique, durabilité nettoyage',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Politique de Qualité - Vertnetgeneve',
    description: 'Notre engagement envers la qualité, la durabilité et la satisfaction client à 100%.',
    url: 'https://www.vertnetgeneve.ch/politique-de-qualite',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Politique de Qualité',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique de Qualité - Vertnetgeneve',
    description: 'Notre engagement envers la qualité, la durabilité et la satisfaction client.',
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
    canonical: 'https://www.vertnetgeneve.ch/politique-de-qualite',
  },
}

export default function QualityPolicyPage() {
  return (
    <>
      <Navigation />
      <QualityPolicy />
      <Footer />
    </>
  )
}

