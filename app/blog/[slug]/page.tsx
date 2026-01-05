import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogPostDetail from '@/components/BlogPostDetail'
import { getBlogPost, getBlogPosts } from '@/lib/blog'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Article Non Trouvé - Vertnetgeneve',
      description: 'L\'article demandé n\'a pas été trouvé.',
    }
  }

  return {
    title: `${post.title} - Blog Vertnetgeneve`,
    description: post.excerpt || `Découvrez notre article sur ${post.title} dans le blog Vertnetgeneve.`,
    keywords: post.tags.join(', ') + ', blog nettoyage, conseils nettoyage professionnel, nettoyage Genève',
    authors: [{ name: 'Vertnetgeneve' }],
    metadataBase: new URL('https://www.vertnetgeneve.ch'),
    openGraph: {
      title: `${post.title} - Vertnetgeneve Blog`,
      description: post.excerpt || `Découvrez notre article sur ${post.title}.`,
      url: `https://www.vertnetgeneve.ch/blog/${params.slug}`,
      type: 'article',
      locale: 'fr_CH',
      siteName: 'Vertnetgeneve',
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${post.title} - Vertnetgeneve Blog`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - Vertnetgeneve Blog`,
      description: post.excerpt || `Découvrez notre article sur ${post.title}.`,
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
      canonical: `https://www.vertnetgeneve.ch/blog/${params.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <BlogPostDetail post={post} />
      <Footer />
    </>
  )
}

