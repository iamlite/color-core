import { SwatchIcon } from '@/components/icons';
import { button as buttonStyles, Input } from '@nextui-org/react';
import { Color } from 'color-core';
import React, { useState } from 'react';
/**
 * Props for the ColorInput component.
 * @interface ColorInputProps
 * @property {Color} color - The current color.
 * @property {(newColor: Color) => void} onColorChange - Callback function when the color changes.
 */
interface ColorInputProps {
  color: Color;
  onColorChange: (newColor: Color) => void;
}

/**
 * A component for inputting and displaying a color.
 * It provides a text input for color codes with a color picker that fills the end content area.
 *
 * @param {ColorInputProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ColorInput component.
 */
const ColorInput: React.FC<ColorInputProps> = ({ color, onColorChange }) => {
  const [inputValue, setInputValue] = useState(color.toHex());

  /**
   * Handles changes to the color input.
   * @param {string} newColorValue - The new color value.
   */
  const handleInputChange = (newColorValue: string) => {
    setInputValue(newColorValue);
    try {
      const newColor = new Color(newColorValue);
      onColorChange(newColor);
    } catch (error) {
      console.error('Invalid color input:', error);
    }
  };

  return (
    <Input
      startContent={<SwatchIcon className='flex-shrink-0 pointer-events-none text-default-400' />}
      type='text'
      size='lg'
      label='Color Code'
      value={inputValue}
      variant='flat'
      placeholder='Enter a color'
      onChange={(e) => handleInputChange(e.target.value)}
      className='max-w-sm py-4'
      classNames={{
        mainWrapper: '',
        label: '',
        input: 'mx-2',
        innerWrapper: '',
        inputWrapper: '',
      }}
      labelPlacement='inside'
      endContent={
        <div
          className={`${buttonStyles({
            radius: 'lg',
          })} absolute -right-3 top-[50%] h-[200%] hover:scale-110 active:scale-125 transition-transform duration-500`}
          style={{
            backgroundColor: color.toHex(),
          }}>
          <input
            type='color'
            value={color.toHex()}
            onChange={(e) => handleInputChange(e.target.value)}
            className='w-full h-full opacity-0 cursor-pointer '
          />
        </div>
      }
    />
  );
};

export default ColorInput;
