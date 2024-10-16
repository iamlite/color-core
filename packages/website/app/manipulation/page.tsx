'use client'

import { useColor } from '@/components/context/color-context'
import { Button, Card, CardContent, CardHeader, Slider } from '@/components/ui'
import ColorInput from '@/components/ui/color-input'
import { Color } from 'color-core'
import { useEffect, useState } from 'react'

const ManipulationSection = () => {
  const { color, setColor } = useColor()
  const [lightnessAmount, setLightnessAmount] = useState(50)
  const [saturationAmount, setSaturationAmount] = useState(100)
  const [hueAmount, setHueAmount] = useState(0)

  useEffect(() => {
    const hsl = color.toHsl()

    setLightnessAmount(hsl.l)
    setSaturationAmount(hsl.s)
    setHueAmount(hsl.h)
  }, [color])

  const handleSliderChange =
    (setter: React.Dispatch<React.SetStateAction<number>>, hslKey: 'h' | 's' | 'l') => (value: number | number[]) => {
      const newValue = Array.isArray(value) ? value[0] : value
      setter(newValue)
      const hsl = color.toHsl()
      setColor(new Color({ ...hsl, [hslKey]: newValue }))
    }

  const resetColor = () => {
    const hsl = color.toHsl()

    setColor(new Color({ ...hsl, h: 195, s: 98, l: 79 }))
    setLightnessAmount(hsl.l)
    setSaturationAmount(hsl.s)
    setHueAmount(hsl.h)
  }

  return (
    <Card blurred className='flex-grow w-full p-6 mx-auto my-4 max-w-7xl'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <h1 className='mb-2 text-2xl font-bold'>Color Manipulator</h1>
        <p className='py-4 text-center'>Manipulate the color values</p>
        <ColorInput />
      </CardHeader>

      <CardContent className='flex flex-col justify-center h-full mt-12 md:flex-row'>
        <div className='w-full px-10 space-y-4 md:w-1/2'>
          <Slider
            label='Lightness'
            color='foreground'
            maxValue={100}
            minValue={0}
            showTooltip={true}
            step={1}
            value={[lightnessAmount]}
            onValueChange={handleSliderChange(setLightnessAmount, 'l')}
          />

          <Slider
            label='Saturation'
            color='foreground'
            maxValue={100}
            minValue={0}
            showTooltip={true}
            step={1}
            value={[saturationAmount]}
            onValueChange={handleSliderChange(setSaturationAmount, 's')}
          />

          <Slider
            label='Hue'
            color='foreground'
            maxValue={359}
            minValue={0}
            showTooltip={true}
            step={1}
            value={[hueAmount]}
            onValueChange={handleSliderChange(setHueAmount, 'h')}
            isHueSlider={true}
          />
        </div>
        <div className='flex flex-col w-full px-10 space-y-4 md:w-1/2 md:mt-0'>
          <Button className='w-full' variant='destructive' onClick={resetColor}>
            Reset
          </Button>
          <Button className='w-full' variant='outline' onClick={() => setColor(color.invert())}>
            Invert
          </Button>
          <Button className='w-full' variant='ghost' onClick={() => setColor(color.grayscale())}>
            Grayscale
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ManipulationSection
