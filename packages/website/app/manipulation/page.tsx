'use client'

import { useColor } from '@/components/color-context'
import ColorInput from '@/components/ui/color-input'
import { Button, Card, CardBody, CardHeader, Slider } from '@nextui-org/react'
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

  const handleLightnessChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value

    setLightnessAmount(newValue)
    const hsl = color.toHsl()

    setColor(new Color({ ...hsl, l: newValue }))
  }

  const handleSaturationChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value

    setSaturationAmount(newValue)
    const hsl = color.toHsl()

    setColor(new Color({ ...hsl, s: newValue }))
  }

  const handleHueChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value
    const newHue = newValue % 360

    setHueAmount(newHue)
    const hsl = color.toHsl()

    setColor(new Color({ ...hsl, h: newHue }))
  }

  const resetColor = () => {
    const hsl = color.toHsl()

    setColor(new Color({ ...hsl, h: 195, s: 98, l: 79 }))
    setLightnessAmount(hsl.l)
    setSaturationAmount(hsl.s)
    setHueAmount(hsl.h)
  }

  return (
    <Card isBlurred className='flex-grow w-full p-6 my-4 max-w-7xl'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <h1 className='mb-2 text-2xl font-bold'>Color Manipulator</h1>
        <p className='py-4 text-center'>Manipulate the color values</p>
        <ColorInput />
      </CardHeader>

      <CardBody className='flex flex-col items-center justify-center h-full md:flex-row'>
        <div className='w-full px-10 space-y-4 md:w-1/2'>
          <Slider
            color='foreground'
            label='Lightness'
            maxValue={100}
            minValue={0}
            showTooltip={true}
            step={1}
            value={lightnessAmount}
            onChange={handleLightnessChange}
          />

          <Slider
            color='foreground'
            label='Saturation'
            maxValue={100}
            minValue={0}
            showTooltip={true}
            step={1}
            value={saturationAmount}
            onChange={handleSaturationChange}
          />

          <Slider
            color='foreground'
            label='Hue'
            maxValue={359}
            minValue={0}
            showTooltip={true}
            step={1}
            value={hueAmount}
            onChange={handleHueChange}
          />
        </div>
        <div className='flex flex-col items-center justify-center w-full px-10 mt-4 space-y-4 md:w-1/2 md:mt-0'>
          <Button fullWidth variant='faded' onPress={resetColor}>
            Reset
          </Button>
          <Button fullWidth variant='light' onPress={() => setColor(color.invert())}>
            Invert
          </Button>
          <Button fullWidth variant='flat' onPress={() => setColor(color.grayscale())}>
            Grayscale
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ManipulationSection
