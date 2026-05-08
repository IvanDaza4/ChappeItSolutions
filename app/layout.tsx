import React from "react"
import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Montserrat, Roboto, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const _montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const _roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: 'Chappe It Solutions - Soluciones Tecnológicas Integrales',
  description: 'Empresa líder en seguridad electrónica, tecnologías de información y energía sustentable. Soluciones integrales para industrias críticas.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/c.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/c.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/c.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/c.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
