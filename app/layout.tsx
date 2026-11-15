import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ParcelsProvider } from '@/lib/data-context'
import './globals.css'
import { CookieBanner } from '@/components/CookieBanner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shiply – Real-time Parcel Tracking',
  description:
    'Track your shipments with complete clarity. Real-time status updates, full journey history, and transparent logistics from origin to delivery.',
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
        url: '/icon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900">
        <Navbar />
        <ParcelsProvider>{children}</ParcelsProvider>
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Footer />
      </body>
    </html>
  )
}