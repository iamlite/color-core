import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Slider, Snippet } from '@nextui-org/react';
import { Color } from 'color-core';
import React, { useEffect, useState } from 'react';
import ColorInput from './color-input';

const ColorMixer: React.FC = () => {
  const [color1, setColor1] = useState(new Color('#00D0FF'));
  const [color2, setColor2] = useState(new Color('#FCD248'));
  const [mixAmount, setMixAmount] = useState(0.5);
  const [mixedColorName, setMixedColorName] = useState('');
  const mixedColor = color1.mix(color2, mixAmount);

  useEffect(() => {
    const fetchColorName = async () => {
      try {
        const name = await mixedColor.getName();
        setMixedColorName(name);
      } catch (error) {
        console.error('Error fetching color name:', error);
        setMixedColorName('Unknown');
      }
    };

    fetchColorName();
  }, [mixedColor]);

  return (
    <Card
      isBlurred
      className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Mixer</CardHeader>
      <CardBody className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col items-center justify-center align-middle'>
          <ColorInput
            color={color1}
            onColorChange={setColor1}
          />
          <div className='flex items-center justify-center my-4'>
            <Divider className='my-4' />
            <p className='mx-4 text-4xl'>+</p>
            <Divider className='my-4' />
          </div>
          <ColorInput
            color={color2}
            onColorChange={setColor2}
          />
        </div>
        <div className='flex flex-col items-center justify-center mt-4'>
          <h3 className='mb-2 text-xl'>Result</h3>
          <Card
            className='w-24 h-24 my-2'
            style={{ backgroundColor: mixedColor.toHex() }}></Card>
          <Snippet
            hideSymbol
            variant='flat'
            className='my-2'>
            {mixedColor.toHex()}
          </Snippet>
          <Chip
            variant='flat'
            className='my-2'>
            {mixedColorName}
          </Chip>
        </div>
      </CardBody>
      <Divider className='mt-4' />
      <CardFooter>
        <Slider
          label='Mix Amount'
          color='foreground'
          showTooltip={true}
          formatOptions={{ style: 'percent' }}
          minValue={0}
          maxValue={1}
          step={0.01}
          value={mixAmount}
          onChange={(value) => setMixAmount(value as number)}
          className='max-w-md mx-auto my-4'
        />
      </CardFooter>
    </Card>
  );
};

export default ColorMixer;
