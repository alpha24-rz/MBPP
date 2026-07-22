import React from "react"
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, Dancing_Script } from 'next/font/google'
import { AuthProvider } from "@/lib/auth-context"

import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: 'MBPP - Mindfulness-Based Psychoeducation Programme',
  description: 'Platform edukasi berbasis penelitian ilmiah (Fakultas Psikologi UNM) untuk membantu Generasi Z membangun hubungan sehat dengan AI melalui kesadaran diri (mindfulness) dan kekuatan karakter.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${dancing.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
