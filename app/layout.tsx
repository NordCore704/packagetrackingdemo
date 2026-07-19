import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ParcelsProvider } from '@/lib/data-context'
import './globals.css'
import { CookieBanner } from '@/components/CookieBanner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Apexbit Cargo Tracking & Logistics',
  description: 'Modern parcel tracking and logistics management system for Apexbit Cargo. Track your shipments, manage logistics, and ensure secure delivery with our advanced platform.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/gemini-svg.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/gemini-svg.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased bg-white">
        <Navbar />
        <ParcelsProvider>{children}</ParcelsProvider>
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Footer />
      </body>
    </html>
  )
}
