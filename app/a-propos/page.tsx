import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'À Propos de Notre Entreprise - Vertnetgeneve',
  description: 'Découvrez Vertnetgeneve, votre partenaire de confiance pour le nettoyage professionnel à Genève. Notre mission, vision et valeurs pour un environnement plus propre et durable.',
  keywords: 'à propos Vertnetgeneve, entreprise nettoyage Genève, mission nettoyage, valeurs nettoyage professionnel, nettoyage écologique Genève',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'À Propos de Notre Entreprise - Vertnetgeneve',
    description: 'Découvrez notre entreprise, notre mission, notre vision et nos valeurs. Excellence en nettoyage professionnel à Genève.',
    url: 'https://www.vertnetgeneve.ch/a-propos',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - À Propos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À Propos - Vertnetgeneve',
    description: 'Découvrez notre entreprise, notre mission, notre vision et nos valeurs.',
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
    canonical: 'https://www.vertnetgeneve.ch/a-propos',
  },
}

export default function About() {
  return (
    <>
      <Navigation />
      <AboutPage />
      <Footer />
    </>
  )
}

