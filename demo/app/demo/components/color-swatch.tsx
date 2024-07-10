'use client';

import { Color } from 'color-core';
import React, { useEffect, useState } from 'react';

interface ColorSwatchProps {
  color: Color;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  const [colorName, setColorName] = useState<string>('');

  useEffect(() => {
    const fetchColorName = async () => {
      try {
        const name = await color.getName();
        setColorName(name);
      } catch (error) {
        console.error('Error fetching color name:', error);
        setColorName('Unknown');
      }
    };

    fetchColorName();
  }, [color]);

  return (
    <div
      className='relative w-8 h-8 m-1 uppercase transition-transform duration-500 rounded-lg shadow-md cursor-pointer hover:scale-125'
      data-tip={`${color.toHex()} ${colorName}`}
      style={{ backgroundColor: color.toHex() }}
      onClick={() => navigator.clipboard.writeText(color.toHex())}></div>
  );
};

export default ColorSwatch;
