import type { Metadata } from 'next'
import Script from 'next/script'
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <Script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    "background": "#0b1326",
                    "surface": "#0b1326",
                    "surface-container-low": "#131b2e",
                    "surface-container": "#171f33",
                    "surface-container-high": "#222a3d",
                    "surface-container-highest": "#2d3449",
                    "primary": "#c3f5ff",
                    "primary-container": "#00e5ff",
                    "tertiary": "#a8ffd2",
                    "tertiary-container": "#005236",
                    "on-surface": "#dae2fd",
                    "on-surface-variant": "#bac9cc",
                    "on-primary-container": "#00363d",
                    "outline-variant": "#3b494c",
                  },
                  fontFamily: {
                    "headline": ["Space Grotesk"],
                    "body": ["Inter"],
                    "mono": ["JetBrains Mono"]
                  },
                },
              },
            }
          `}
        </Script>
      </head>
      <body className="bg-background text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  )
}
