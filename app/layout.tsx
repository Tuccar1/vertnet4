import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yeni Web Sitesi',
  description: 'Modern ve güzel bir web sitesi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
