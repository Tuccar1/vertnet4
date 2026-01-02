import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Genève Nettoyage - Excellence en Nettoyage Professionnel',
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'nettoyage, Genève, Suisse, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel',
  authors: [{ name: 'Vernetgeneve' }],
  openGraph: {
    title: 'Genève Nettoyage - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure',
    type: 'website',
    locale: 'fr_CH',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
