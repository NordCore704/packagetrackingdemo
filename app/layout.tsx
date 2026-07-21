import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { ParcelsProvider } from '@/lib/data-context'
import './globals.css'
import { CookieBanner } from '@/components/CookieBanner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// 1. Configure the primary sans-serif font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// 2. Configure the monospace font for tracking codes
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

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
    // 3. Inject the CSS variables into the HTML tag alongside your existing background class
    <html lang="en" className={`bg-background ${jakarta.variable} ${jetbrainsMono.variable}`}>
      {/* 4. Add 'font-sans' here so the whole app inherits it by default */}
      <body className="font-sans antialiased bg-white">
        <Navbar />
        <ParcelsProvider>{children}</ParcelsProvider>
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Footer />
      </body>
    </html>
  )
}