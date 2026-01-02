import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortfolioGallery from '@/components/PortfolioGallery'

export const metadata = {
  title: 'Portfolio - Genève Nettoyage',
  description: 'Découvrez nos réalisations et témoignages clients.',
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

