import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceDetail from '@/components/ServiceDetail'
import { servicesData } from '@/lib/services-data'

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug]
  
  if (!service) {
    return {
      title: 'Service Non Trouvé - Vertnetgeneve',
      description: 'Le service demandé n\'a pas été trouvé.',
    }
  }

  return {
    title: `${service.title} - Service de Nettoyage Professionnel | Vertnetgeneve`,
    description: `${service.description} Service disponible à Genève. Devis gratuit 24/7.`,
    keywords: `${service.title.toLowerCase()}, nettoyage ${service.title.toLowerCase()} Genève, service nettoyage professionnel, devis ${service.title.toLowerCase()}`,
    authors: [{ name: 'Vertnetgeneve' }],
    metadataBase: new URL('https://www.vertnetgeneve.ch'),
    openGraph: {
      title: `${service.title} - Vertnetgeneve`,
      description: service.description,
      url: `https://www.vertnetgeneve.ch/services/${params.slug}`,
      type: 'website',
      locale: 'fr_CH',
      siteName: 'Vertnetgeneve',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} - Vertnetgeneve`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Vertnetgeneve`,
      description: service.description,
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
      canonical: `https://www.vertnetgeneve.ch/services/${params.slug}`,
    },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug]

  if (!service) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <ServiceDetail service={service} />
      <Footer />
    </>
  )
}

