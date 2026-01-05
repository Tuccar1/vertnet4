import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogList from '@/components/BlogList'
import { getBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog - Conseils Nettoyage Professionnel | Vertnetgeneve',
  description: 'Découvrez nos articles et conseils sur le nettoyage professionnel, l\'entretien écologique, la qualité de l\'air et les meilleures pratiques à Genève.',
  keywords: 'blog nettoyage, conseils nettoyage, articles nettoyage professionnel, nettoyage écologique, entretien professionnel',
  authors: [{ name: 'Vertnetgeneve' }],
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Blog - Vertnetgeneve',
    description: 'Découvrez nos articles sur le nettoyage professionnel, les conseils d\'entretien et les dernières actualités.',
    url: 'https://www.vertnetgeneve.ch/blog',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'Vertnetgeneve',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Vertnetgeneve',
    description: 'Découvrez nos articles sur le nettoyage professionnel et les conseils d\'entretien.',
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
    canonical: 'https://www.vertnetgeneve.ch/blog',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <Navigation />
      <BlogList posts={posts} />
      <Footer />
    </>
  )
}

