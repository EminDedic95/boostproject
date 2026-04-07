import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BOOST Biznis Plan',
  description: 'AI vodič za izradu biznis plana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  )
}
