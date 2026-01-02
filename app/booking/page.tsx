import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'

export const metadata = {
  title: 'Réserver un Service - Genève Nettoyage',
  description: 'Réservez votre service de nettoyage en ligne. Disponible 24h/24 et 7j/7.',
}

export default function BookingPage() {
  return (
    <>
      <Navigation />
      <BookingForm />
      <Footer />
    </>
  )
}

