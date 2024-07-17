'use client'
import { Button, Card, CardHeader, Link } from '@nextui-org/react'

import InstallSnippet from '@/components/install-snippet'
import ThemeAwareLogo from '@/components/theme-logo'

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center h-full px-4 space-y-6'>
      <Card isBlurred className='p-10 w-full md:w-[40vw] opacity-80'>
        <ThemeAwareLogo
          alt='Color Core Logo'
          darkSrc='/assets/color-core-light.png'
          lightSrc='/assets/color-core-dark.png'
          width={400}
        />
      </Card>
      <Card isBlurred className='p-10 opacity-80'>
        <CardHeader className='max-w-3xl mx-auto text-lg leading-relaxed '>
          <p className='text-center'>
            Elevate your web and app designs with precise color management. color-core empowers developers to
            manipulate, convert, and harmonize colors effortlessly, ensuring visually stunning and accessible user
            interfaces.
          </p>
        </CardHeader>

        <div className='flex flex-col self-center max-w-sm py-4 space-y-4'>
          <InstallSnippet packageName='color-core' />
        </div>

        <div className='max-w-3xl pt-4 mx-auto space-y-6 text-center'>
          <h2 className='text-2xl font-semibold'>Key Features</h2>
          <ul className='grid grid-cols-1 gap-4 text-left text-default-600 md:grid-cols-2'>
            <li className='flex items-start'>
              <span className='mr-2 text-xl text-primary'>✨</span>
              <div>
                <strong>Comprehensive color spaces:</strong> Support for RGB, HEX, HSL, HSV, CMYK, LAB, LCH, XYZ, and
                YUV
              </div>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-xl text-primary'>🔄</span>
              <div>
                <strong>Effortless conversions:</strong> Seamlessly switch between color models with precision
              </div>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-xl text-primary'>🌈</span>
              <div>
                <strong>Advanced harmony generation:</strong> Create stunning color schemes with built-in harmony
                algorithms
              </div>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-xl text-primary'>🛠</span>
              <div>
                <strong>Powerful manipulation tools:</strong> Adjust hue, saturation, lightness, and more with ease
              </div>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-xl text-primary'>💪</span>
              <div>
                <strong>Full TypeScript support:</strong> Enjoy type safety and excellent IDE integration
              </div>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-xl text-primary'>🎨</span>
              <div>
                <strong>Intuitive Color class:</strong> Simplified API for all your color manipulation needs
              </div>
            </li>
          </ul>
        </div>
      </Card>
      <Card isBlurred className='p-6'>
        <h3 className='mb-2 text-xl font-semibold'>See it in Action</h3>
        <p className='mb-4'>Experience the power and flexibility of color-core in our interactive demo.</p>
        <Button as={Link} href='/demo' size='lg' variant='solid'>
          Try the Demo
        </Button>
      </Card>
    </section>
  )
}
