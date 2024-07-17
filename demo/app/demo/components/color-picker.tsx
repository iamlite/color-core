import { Card, CardHeader } from '@nextui-org/react'
import { Color, ColorPicker, RGB } from 'color-core'
import React, { useCallback } from 'react'

interface ColorPickerDemoProps {
  color: Color
  setColor?: React.Dispatch<React.SetStateAction<Color>>
}

const ColorPickerDemo: React.FC<ColorPickerDemoProps> = ({ color, setColor }) => {
  const handleColorChange = useCallback(
    (newRgb: RGB) => {
      if (setColor) {
        setColor(new Color(newRgb))
      }
    },
    [setColor]
  )

  return (
    <>
      <Card isBlurred className='w-full md:w-[40vw] my-2 px-4'>
        <CardHeader className='justify-center my-4 text-lg font-semibold'>Unstyled Color Picker</CardHeader>
        <ColorPicker initialColor={color.toRgb()} onChange={handleColorChange} />
      </Card>
      <Card isBlurred className='w-full md:w-[40vw] my-2 px-4'>
        <CardHeader className='justify-center my-4 text-lg font-semibold'>Styled With Tailwind CSS</CardHeader>
        <ColorPicker
          className='shadow-lg bg-zinc-800 rounded-2xl'
          containerClassName='rounded-2xl shadow-lg'
          containerStyle={{ minHeight: 'auto' }}
          height={400}
          hueSliderClassName='rounded-2xl shadow-inner'
          hueSliderCursorClassName='rounded-full bg-white shadow-md border-2 border-gray-300'
          hueSliderHeight={40}
          initialColor={color.toRgb()}
          inputClassName='rounded-2xl w-full uppercase text-center text-xs'
          previewClassName='rounded-2xl shadow-inner'
          saturationValueAreaClassName='rounded-2xl shadow-inner'
          saturationValueCursorClassName='border-2 border-white shadow-md'
          width={500}
          onChange={handleColorChange}
        />
      </Card>
    </>
  )
}

export default ColorPickerDemo
