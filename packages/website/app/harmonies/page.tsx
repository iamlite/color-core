'use client'
import { useColor } from '@/components/context/color-context'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import ColorInput from '@/components/ui/color-input'
import ColorSwatch from '@/components/ui/color-swatch'
import { Color } from 'color-core'

interface ColorSectionProps {
  title: string
  colors: Color[]
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors }) => (
  <Card className='flex items-stretch h-full'>
    <CardContent className='flex flex-col justify-center w-full py-4'>
      <div className='flex flex-row items-center w-full'>
        <p className='flex-shrink-0 mr-4 text-sm'>{title}</p>
        <div className='flex flex-row justify-end flex-grow'>
          {colors.map((color, index) => (
            <ColorSwatch key={index} color={color} />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function HarmonyPage() {
  const { color, setColor } = useColor()

  return (
    <Card blurred className='flex-grow w-full p-6 mx-auto my-4 max-w-7xl'>
      <CardHeader className='justify-center'>
        <p className='mb-4 text-lg font-semibold'>Color Harmonies</p>
        <div className='flex flex-col items-center'>
          <ColorInput color={color} onColorChange={setColor} />
        </div>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2 place-content-center'>
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
      </CardContent>
    </Card>
  )
}
