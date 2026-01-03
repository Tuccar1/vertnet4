import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReglementSecurite from '@/components/ReglementSecurite'

export const metadata = {
  title: 'Règlement & Sécurité - Vertnetgeneve',
  description: 'Conformité légale complète, sécurité du personnel et engagement environnemental. Vertnetgeneve opère en stricte conformité avec le cadre légal suisse.',
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

