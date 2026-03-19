import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kinetic Ledger | LLM Token Dashboard',
  description: 'High-velocity LLM token management dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-surface antialiased">
        {children}
      </body>
    </html>
  )
}
