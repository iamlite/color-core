import { Footer } from '@/components/ui/footer'
import { Navbar } from '@/components/ui/navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  display: 'swap',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: 'Color-Core',
    template: `%s · Color-Core`
  },
  description:
    'A comprehensive color manipulation library that serves as a fundamental toolkit for handling colors in TypeScript and JavaScript applications.',
  applicationName: 'Color-Core',
  authors: [
    {
      name: 'Tariel Davidashvili',
      url: 'https://tarieldavids.com'
    }
  ],
  creator: 'Tariel Davidashvili',
  publisher: 'Tariel Davidashvili',
  generator: 'Next.js',
  keywords: [
    'color',
    'palette',
    'generator',
    'wcag',
    'compliant',
    'accessible',
    'tailwind',
    'react',
    'next',
    'typescript'
  ],
  referrer: 'origin',
  metadataBase: new URL('https://color-core.com'),
  openGraph: {
    title: 'Color-Core',
    description:
      'A comprehensive color manipulation library that serves as a fundamental toolkit for handling colors in TypeScript and JavaScript applications.',
    url: 'https://color-core.com',
    siteName: 'Color-Core',
    images: [
      {
        url: 'https://color-core.com/opengraph-image',
        width: 1200,
        height: 630
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <meta content='#94e3fe' name='theme-color' />
      </head>

      <body
        className={`${inter.className} antialiased h-dvh md:h-screen w-full transition-colors duration-500 flex flex-col`}>
        <Providers>
          <Navbar />
          <main className='flex flex-col justify-center flex-grow px-4 md:px-0'>
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
