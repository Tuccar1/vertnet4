import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReglementSecurite from '@/components/ReglementSecurite'

export const metadata = {
  title: 'Règlement & Sécurité - Genève Nettoyage',
  description: 'Conformité légale complète, sécurité du personnel et engagement environnemental. Genève Nettoyage opère en stricte conformité avec le cadre légal suisse.',
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

