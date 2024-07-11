import { Card, CardHeader } from '@nextui-org/react';
import { Color, ColorPicker, RGB } from 'color-core';
import React, { useCallback } from 'react';

interface ColorPickerDemoProps {
  color: Color;
  setColor?: React.Dispatch<React.SetStateAction<Color>>;
}

const ColorPickerDemo: React.FC<ColorPickerDemoProps> = ({ color, setColor }) => {
  const handleColorChange = useCallback(
    (newRgb: RGB) => {
      if (setColor) {
        setColor(new Color(newRgb));
      }
    },
    [setColor]
  );

  return (
    <>
      <Card
        isBlurred
        className='w-full md:w-[40vw] my-2 px-4'>
        <CardHeader className='justify-center my-4 text-lg font-semibold'>Unstyled Color Picker</CardHeader>
        <ColorPicker
          initialColor={color.toRgb()}
          onChange={handleColorChange}
        />
      </Card>
      <Card
        isBlurred
        className='w-full md:w-[40vw] my-2 px-4'>
        <CardHeader className='justify-center my-4 text-lg font-semibold'>Styled With Tailwind CSS</CardHeader>
        <ColorPicker
          initialColor={color.toRgb()}
          containerClassName='rounded-2xl shadow-lg'
          containerStyle={{ minHeight: 'auto' }}
          className='shadow-lg bg-zinc-800 rounded-2xl'
          onChange={handleColorChange}
          width={500}
          height={400}
          saturationValueAreaClassName='rounded-2xl shadow-inner'
          saturationValueCursorClassName='border-2 border-white shadow-md'
          hueSliderClassName='rounded-2xl shadow-inner'
          hueSliderHeight={40}
          hueSliderCursorClassName='rounded-full bg-white shadow-md border-2 border-gray-300'
          inputClassName='rounded-2xl w-full uppercase text-center text-xs'
          previewClassName='rounded-2xl shadow-inner'
        />
      </Card>
    </>
  );
};

export default ColorPickerDemo;
