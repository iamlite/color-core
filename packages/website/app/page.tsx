'use client'
import { Card, CardHeader } from '@/components/ui'

import ThemeAwareLogo from '@/components/theme-logo'
import InstallSnippet from '@/components/ui/install-snippet'

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center h-full px-4 py-10 space-y-6'>
      <Card className='p-10 w-full md:w-[40vw] opacity-80'>
        <ThemeAwareLogo
          alt='Color Core Logo'
          darkSrc='/assets/color-core-light.png'
          lightSrc='/assets/color-core-dark.png'
          width={300}
        />
      </Card>
      <Card className='p-10 opacity-80'>
        <CardHeader className='flex flex-col items-center justify-center max-w-3xl mx-auto text-sm leading-relaxed'>
          <p className='text-center'>
            Elevate your web and app designs with precise color management. color-core empowers developers to
            manipulate, convert, and harmonize colors effortlessly, ensuring visually stunning and accessible user
            interfaces.
          </p>
          <div className='flex flex-col items-center justify-center max-w-sm py-4 space-y-4'>
            <InstallSnippet packageName='color-core' />
          </div>
        </CardHeader>

        <div className='max-w-3xl pt-4 mx-auto space-y-6 text-center'>
          <h2 className='text-xl font-semibold'>Key Features</h2>
          <ul className='grid grid-cols-1 gap-4 text-left md:grid-cols-2'>
            <li className='flex items-start text-sm'>
              <span className='mr-2 text-foreground'>✨</span>
              <div>
                <strong>Comprehensive color spaces:</strong> Support for RGB, HEX, HSL, HSV, CMYK, LAB, LCH, XYZ, YUV,
                HPLuv, HSLuv, CIExyY, and more
              </div>
            </li>
            <li className='flex items-start text-sm'>
              <span className='mr-2 text-foreground'>🔄</span>
              <div>
                <strong>Effortless conversions:</strong> Seamlessly switch between color models with precision
              </div>
            </li>
            <li className='flex items-start text-sm'>
              <span className='mr-2 text-foreground'>🌈</span>
              <div>
                <strong>Advanced harmony generation:</strong> Create stunning color schemes with built-in harmony
                algorithms
              </div>
            </li>
            <li className='flex items-start text-sm'>
              <span className='mr-2 text-foreground'>🛠</span>
              <div>
                <strong>Powerful manipulation tools:</strong> Adjust hue, saturation, lightness, and more with ease
              </div>
            </li>
            <li className='flex items-start text-sm'>
              <span className='mr-2 text-foreground'>💪</span>
              <div>
                <strong>Full TypeScript support:</strong> Enjoy type safety and excellent IDE integration
              </div>
            </li>
            <li className='flex items-start text-sm'>
              <span className='mr-2 text-foreground'>🎨</span>
              <div>
                <strong>Intuitive Color class:</strong> Simplified API for all your color manipulation needs
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </section>
  )
}
