import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adilev - Adil Kira Hesaplama',
  description: 'Türkiye\'de ev kiralarının gerçek değerini hesaplayan platform',
  keywords: 'kira hesaplama, ev kirası, Türkiye, adil kira, emlak',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 