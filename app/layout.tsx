import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fitness Zone Rajshahi | Premier Gym & Dual-Branch Fitness',
  description: 'Fitness Zone Rajshahi offers premier strength and conditioning across New Market and Bhadra branches. Work out at both branches with one membership. Free steam bath facilities and dedicated female workout hours.',
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
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Fitness Zone Rajshahi | Premier Dual-Branch Gym',
    description: 'Premier fitness & strength training in Rajshahi across New Market and Bhadra branches. 1 membership, 2 branches, free steam bath, and dedicated women hours.',
    url: 'https://fitnesszonerajshahi.com',
    siteName: 'Fitness Zone Rajshahi',
    images: [
      {
        url: '/images/fitness-zone-logo.png',
        width: 960,
        height: 960,
        alt: 'Fitness Zone Rajshahi Official Brand Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fitness Zone Rajshahi | Premier Dual-Branch Gym',
    description: 'Premier fitness in Rajshahi. Dual branch access at New Market & Bhadra More.',
    images: ['/images/fitness-zone-logo.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
