import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesCategories from '@/components/ServicesCategories'

export const metadata = {
  title: 'Nos Services - Vertnetgeneve',
  description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Résidentiels, Commerciaux et Spécialisés.',
}

export default function ServicesPage() {
  return (
    <div className="services-page-wrapper">
      <Navigation />
      <ServicesCategories />
      <Footer />
    </div>
  )
}

