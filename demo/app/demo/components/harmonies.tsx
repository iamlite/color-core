import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Color } from 'color-core'
import React from 'react'

import ColorSwatch from './color-swatch'

interface ColorSectionProps {
  title: string
  colors: Color[]
}

interface ColorHarmoniesProps {
  color: Color
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors }) => (
  <Card isFooterBlurred>
    <CardBody className='flex flex-row items-center justify-between'>
      <p className='text-sm'>{title}</p>
      <div className='flex flex-row '>
        {colors.map((color, index) => (
          <ColorSwatch key={index} color={color} />
        ))}
      </div>
    </CardBody>
  </Card>
)

const ColorHarmonies: React.FC<ColorHarmoniesProps> = ({ color }) => {
  return (
    <Card isBlurred className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Harmonies</CardHeader>
      <CardBody className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <ColorSection colors={color.doubleSplitComplementary()} title='Double Split Complementary' />
        <ColorSection colors={color.monochromatic(5)} title='Monochromatic' />
        <ColorSection colors={color.shades()} title='Shades' />
        <ColorSection colors={color.tints()} title='Tints' />
        <ColorSection colors={color.tones()} title='Tones' />
        <ColorSection colors={color.tetradic()} title='Tetradic' />
        <ColorSection colors={color.square()} title='Square' />
        <ColorSection colors={color.analogous()} title='Analogous' />
        <ColorSection colors={color.triadic()} title='Triadic' />
        <ColorSection colors={color.splitComplementary()} title='Split Complementary' />
        <ColorSection colors={color.complementary()} title='Complementary' />
      </CardBody>
    </Card>
  )
}

export default ColorHarmonies
