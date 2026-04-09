import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Greenhouse Smart Management Dashboard',
  description: 'Modern dashboard for smart greenhouse control',
  themeColor: '#10b981',
  appleWebApp: {
    title: 'Greenhouse Dashboard',
    statusBarStyle: 'default',
  },
  icons: [
    { 
      url: '/icons/logogreen.jpg', 
      sizes: '192x192', 
      type: 'image/jpeg'
    },
    { 
      url: '/icons/logogreen.jpg', 
      sizes: '512x512', 
      type: 'image/jpeg'
    }
  ],
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/logogreen.jpg" />
        <script async src="/sw.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
