import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Color } from 'color-core';
import React from 'react';
import ColorSwatch from './color-swatch';

interface ColorSectionProps {
  title: string;
  colors: Color[];
}

interface ColorHarmoniesProps {
  color: Color;
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors }) => (
  <Card isFooterBlurred>
    <CardBody className='flex flex-row justify-between'>
      <p className='text-sm'>{title}</p>
      <div className='flex flex-row '>
        {colors.map((color, index) => (
          <ColorSwatch
            key={index}
            color={color}
          />
        ))}
      </div>
    </CardBody>
  </Card>
);

const ColorHarmonies: React.FC<ColorHarmoniesProps> = ({ color }) => {
  return (
    <Card
      isBlurred
      className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Harmonies</CardHeader>
      <CardBody className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <ColorSection
          title='Double Split Complementary'
          colors={color.doubleSplitComplementary()}
        />
        <ColorSection
          title='Monochromatic'
          colors={color.monochromatic(5)}
        />
        <ColorSection
          title='Shades'
          colors={color.shades()}
        />
        <ColorSection
          title='Tints'
          colors={color.tints()}
        />
        <ColorSection
          title='Tones'
          colors={color.tones()}
        />
        <ColorSection
          title='Tetradic'
          colors={color.tetradic()}
        />

        <ColorSection
          title='Square'
          colors={color.square()}
        />

        <ColorSection
          title='Analogous'
          colors={color.analogous()}
        />
        <ColorSection
          title='Triadic'
          colors={color.triadic()}
        />
        <ColorSection
          title='Split Complementary'
          colors={color.splitComplementary()}
        />
        <ColorSection
          title='Complementary'
          colors={color.complementary()}
        />
      </CardBody>
    </Card>
  );
};

export default ColorHarmonies;
