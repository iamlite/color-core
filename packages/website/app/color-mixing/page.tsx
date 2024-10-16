'use client'

import { Badge, Card, CardContent, CardFooter, CardHeader, Separator, Slider } from '@/components/ui/'
import ColorInput from '@/components/ui/color-input'
import { Color } from 'color-core'
import { useEffect, useState } from 'react'

const ColorMixer: React.FC = () => {
  const [color1, setColor1] = useState(new Color('#00D0FF'))
  const [color2, setColor2] = useState(new Color('#FCD248'))
  const [mixAmount, setMixAmount] = useState(0.5)
  const [mixedColorName, setMixedColorName] = useState('')
  const mixedColor = color1.mix(color2, mixAmount)

  useEffect(() => {
    const fetchColorName = async () => {
      try {
        const name = await mixedColor.getName()

        setMixedColorName(name)
      } catch (error) {
        setMixedColorName('Unknown')
      }
    }

    fetchColorName()
  }, [mixedColor])
  return (
    <Card blurred className='flex-grow w-full p-6 mx-auto my-4 max-w-7xl'>
      <CardHeader className='flex flex-col justify-center my-4'>
        <h2 className='py-4 text-4xl font-bold'>Color Mixer</h2>
        <p className='text-center'>Mix and blend colors using the color mixing formula</p>
        <p className='text-center'>Use the slider to adjust the amount of mixing</p>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2 place-content-center'>
        <div className='flex flex-col items-center justify-center align-middle'>
          <ColorInput color={color1} onColorChange={setColor1} />
          <div className='flex items-center justify-center my-4'>
            <Separator className='my-4' />
            <p className='mx-4 text-4xl'>+</p>
            <Separator className='my-4' />
          </div>
          <ColorInput color={color2} onColorChange={setColor2} />
        </div>
        <div className='flex flex-col items-center justify-center mt-4'>
          <h3 className='mb-2 text-xl'>Result</h3>
          <Card className='w-24 h-24 my-2' style={{ backgroundColor: mixedColor.toHex() }} />
          <div className='my-2'>{mixedColor.toHex()}</div>
          <Badge className='my-2'>{mixedColorName}</Badge>
        </div>
      </CardContent>
      <Separator className='my-4' />
      <CardFooter className='flex flex-col items-center'>
        <div className='w-full max-w-md my-4'>
          <div className='flex justify-between w-full max-w-md mb-4 text-center'>
            <div className='text-xs'>Mix Amount</div>
            <div className='text-xs'>{Math.round(mixAmount * 100)}%</div>
          </div>
          <Slider
            className='w-full'
            color='foreground'
            max={1}
            min={0}
            step={0.01}
            value={[mixAmount]}
            onValueChange={(value: number[]) => setMixAmount(value[0])}
          />
        </div>
      </CardFooter>
    </Card>
  )
}

export default ColorMixer
