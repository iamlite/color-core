import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import { Metadata } from 'next'

import { Providers } from './providers'

import { ColorContextProvider } from '@/components/color-context'
import { Footer } from '@/components/ui/footer'
import { Navbar } from '@/components/ui/navbar'
import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang='en'>
      <head>
        <meta
          content='#94e3fe'
          name='theme-color'
        />
      </head>

      <body className={clsx('min-h-screen flex flex-col font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark', children }}>
          <ColorContextProvider
            initialColor='#94e3fe'
            className='flex flex-col flex-grow'>
            <Navbar />
            <main className='flex justify-center mx-auto max-w-[90vw] min-h-[90vh] transition-transform-opacity ease-soft-spring duration-500 '>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer />
          </ColorContextProvider>
        </Providers>
      </body>
    </html>
  )
}
