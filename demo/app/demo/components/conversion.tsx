import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';
import { Color } from 'color-core';
import React, { useState } from 'react';

interface ConversionSectionProps {
  color: Color;
}

const ConversionSection: React.FC<ConversionSectionProps> = ({ color }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const conversions = {
    RGB: color.toRgb(),
    HSL: color.toHsl(),
    HSV: color.toHsv(),
    CMYK: color.toCmyk(),
    LAB: color.toLab(),
    LCH: color.toLch(),
    XYZ: color.toXyz(),
    YUV: color.toYuv(),
  };

  const handleCopy = (key: string, value: Record<string, number | undefined>) => {
    const content = Object.entries(value)
      .map(([subKey, subValue]) => `${subKey}: ${typeof subValue === 'number' ? subValue.toFixed(2) : subValue}`)
      .join('\n');

    navigator.clipboard.writeText(`${key}:\n${content}`).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <Card
      isBlurred
      className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Conversions</CardHeader>
      <div className='grid grid-cols-1 gap-4 m-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Object.entries(conversions).map(([key, value]) => (
          <Card
            isFooterBlurred
            isPressable
            key={key}
            className='relative bg-content2'
            onClick={() => handleCopy(key, value)}>
            <CardHeader className='flex-col items-start '>
              <p className='text-sm'>{key}</p>
            </CardHeader>
            <Divider />
            <CardBody className='py-2 overflow-visible'>
              {Object.entries(value).map(([subKey, subValue]) => (
                <div
                  key={subKey}
                  className='flex items-center justify-between py-1'>
                  <span className='font-semibold'>{subKey}:</span>
                  <span>{typeof subValue === 'number' ? subValue.toFixed(2) : subValue}</span>
                </div>
              ))}
            </CardBody>
            <CardFooter className='flex justify-center'>
              <span className='text-xs'>{copiedKey === key ? 'Copied!' : ''}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ConversionSection;
