import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'safeids — Stop passing the wrong ID',
  description: 'Branded ID types for TypeScript. Make ID domain mixups a compile error.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
