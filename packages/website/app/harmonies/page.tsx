'use client'
import { useColor } from '@/components/color-context'
import ColorInput from '@/components/ui/color-input'
import ColorSwatch from '@/components/ui/color-swatch'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Color } from 'color-core'

interface ColorSectionProps {
  title: string
  colors: Color[]
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors }) => (
  <Card isFooterBlurred className='flex'>
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

export default function HarmonyPage() {
  const { color, setColor } = useColor()

  return (
    <Card isBlurred className='flex-grow w-full p-6 my-4 max-w-7xl'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Harmonies</CardHeader>
      <div className='flex flex-col items-center '>
        <ColorInput color={color} onColorChange={setColor} />
      </div>

      <CardBody className='grid grid-cols-1 gap-4 md:grid-cols-2 place-content-center'>
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
