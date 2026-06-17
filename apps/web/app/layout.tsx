import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://safeids.dev'),
  title: 'safeids — Branded TypeScript IDs that prevent domain mixups',
  description: 'Make passing userId where orderId belongs a compile error, not a production bug. Branded types, prefixed ID generators, Zod integration.',
  keywords: ['TypeScript', 'branded types', 'ID safety', 'domain driven design', 'type safety'],
  openGraph: {
    title: 'safeids — Stop passing the wrong ID',
    description: 'Branded TypeScript IDs that prevent domain mixups at compile time',
    url: 'https://safeids.dev',
    siteName: 'safeids',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'safeids - Type-safe branded IDs',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'safeids — Stop passing the wrong ID',
    description: 'Branded TypeScript IDs that prevent domain mixups at compile time',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-[#f5f5f7] antialiased">{children}</body>
    </html>
  )
}
