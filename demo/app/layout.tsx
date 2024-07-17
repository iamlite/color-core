import { ColorContextProvider } from '@/components/color-context';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <head>
        <meta
          name='theme-color'
          content='#387ED3'
        />
      </head>
      <body className={clsx('min-h-screen font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <ColorContextProvider
            initialColor='#387ED3'
            className='flex flex-col min-h-screen'>
            <Navbar />

            <main className='flex-grow container px-6 pt-16 mx-auto max-w-[90vw] transition-transform-opacity ease-soft-spring duration-500'>
              {children}
            </main>

            <Footer />
          </ColorContextProvider>
        </Providers>
      </body>
    </html>
  );
}
