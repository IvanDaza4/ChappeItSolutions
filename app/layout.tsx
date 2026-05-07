import React from "react"
import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Inter, Geist_Mono, Source_Serif_4 } from 'next/font/google'

// Initialize premium font stack
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'], 
  weight: ["400", "500"],
  variable: '--font-geist-mono'
})

const sourceSerif = Source_Serif_4({ 
  subsets: ['latin'], 
  weight: ["400", "500", "600"],
  variable: '--font-source-serif'
})

export const metadata: Metadata = {
  title: 'Chappe IT Solutions | Soluciones Tecnologicas de Elite',
  description: 'Arquitectura digital de vanguardia. Seguridad electronica, infraestructura IT e IoT para empresas que exigen excelencia.',
  generator: 'v0.app',
  keywords: ['tecnologia', 'seguridad electronica', 'IT', 'IoT', 'soluciones empresariales', 'Buenos Aires'],
  authors: [{ name: 'Chappe IT Solutions' }],
  creator: 'Chappe IT Solutions',
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
    ],
    apple: '/c.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Chappe IT Solutions',
    title: 'Chappe IT Solutions | Soluciones Tecnologicas de Elite',
    description: 'Arquitectura digital de vanguardia. Seguridad electronica, infraestructura IT e IoT.',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
