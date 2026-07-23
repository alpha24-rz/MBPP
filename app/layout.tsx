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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-intimacy-one.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ai Intimacy — Program Psikoedukasi Mindfulness & AI (Fakultas Psikologi UNM)',
    template: '%s | Ai Intimacy MBPP UNM',
  },
  description: 'Ai Intimacy (MBPP) adalah platform psikoedukasi ilmiah hasil penelitian Fakultas Psikologi Universitas Negeri Makassar (UNM) untuk membantu Generasi Z membangun hubungan sehat, emosi seimbang, dan etika bijak dalam berinteraksi dengan AI.',
  keywords: [
    'Ai Intimacy',
    'AI Intimacy UNM',
    'MBPP',
    'Mindfulness-Based Psychoeducation Programme',
    'Psikologi UNM',
    'Universitas Negeri Makassar',
    'Mindfulness AI',
    'Generasi Z dan AI',
    'Karakter dan Etika AI',
    'Regulasi Emosi AI',
    'Psikoedukasi Indonesia',
  ],
  authors: [{ name: 'Tim Peneliti Fakultas Psikologi UNM', url: siteUrl }],
  creator: 'Fakultas Psikologi UNM',
  publisher: 'Fakultas Psikologi Universitas Negeri Makassar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ai Intimacy — Program Psikoedukasi Mindfulness & AI (UNM)',
    description: 'Platform edukasi berbasis riset Fakultas Psikologi UNM untuk membantu Generasi Z membangun kesadaran diri dan hubungan sehat dengan AI.',
    url: siteUrl,
    siteName: 'Ai Intimacy (MBPP UNM)',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Logo Ai Intimacy MBPP UNM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ai Intimacy — Program Psikoedukasi Mindfulness & AI (UNM)',
    description: 'Platform edukasi ilmiah dari Fakultas Psikologi UNM untuk membantu Generasi Z dalam interaksi dengan AI.',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD Structured Data for Google Rich Snippets
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Ai Intimacy — MBPP UNM',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: 'Platform psikoedukasi berbasis kesadaran diri (mindfulness) dan kekuatan karakter untuk membantu Generasi Z membangun hubungan sehat dengan AI.',
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitas Negeri Makassar',
    url: 'https://unm.ac.id',
  },
  department: {
    '@type': 'Organization',
    name: 'Fakultas Psikologi UNM',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${playfair.variable} ${dancing.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
