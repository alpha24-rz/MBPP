import React from "react"
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, Dancing_Script } from 'next/font/google'

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
  title: 'Aether - Your Creative Workspace in the Cloud',
  description: 'A beautiful, personal workspace where your ideas take flight. Create, collaborate, and build without limits.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${dancing.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
