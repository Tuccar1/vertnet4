import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vernetgeneve - Excellence en Nettoyage Professionnel',
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève et en Suisse. Nettoyage commercial, résidentiel, médical et industriel.',
  keywords: 'nettoyage, Genève, Suisse, nettoyage professionnel, nettoyage commercial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
