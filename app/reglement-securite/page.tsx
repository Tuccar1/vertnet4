import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReglementSecurite from '@/components/ReglementSecurite'

export const metadata: Metadata = {
  title: 'Règlement & Sécurité - Conformité Légale | Vertnetgeneve',
  description: 'Vertnetgeneve opère en stricte conformité avec le cadre légal suisse. Découvrez nos engagements en matière de conformité légale, sécurité du personnel et protection environnementale à Genève.',
  keywords: 'règlement nettoyage Genève, sécurité nettoyage, conformité légale nettoyage, normes nettoyage Suisse, sécurité personnel nettoyage',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Règlement & Sécurité - Vertnetgeneve',
    description: 'Conformité légale complète, sécurité du personnel et engagement environnemental. Vertnetgeneve opère en stricte conformité avec le cadre légal suisse.',
    url: 'https://www.vertnetgeneve.ch/reglement-securite',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Règlement & Sécurité',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Règlement & Sécurité - Vertnetgeneve',
    description: 'Conformité légale complète, sécurité du personnel et engagement environnemental.',
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
    canonical: 'https://www.vertnetgeneve.ch/reglement-securite',
  },
}

export default function ReglementSecuritePage() {
  return (
    <>
      <Navigation />
      <ReglementSecurite />
      <Footer />
    </>
  )
}

