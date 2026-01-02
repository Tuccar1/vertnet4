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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Article Non Trouvé - Genève Nettoyage',
    }
  }

  return {
    title: `${post.title} - Genève Nettoyage Blog`,
    description: post.excerpt,
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

