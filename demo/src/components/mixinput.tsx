import { Color } from 'next-colors';
import React from 'react';

interface MixInputProps {
    color: Color;
    onColorChange: (newColor: Color) => void;
    inputPosition: 'left' | 'right';
}

export const MixInput: React.FC<MixInputProps> = ({ color, onColorChange, inputPosition }) => {
    const [inputValue, setInputValue] = React.useState(color.toHex());

    const handleInputChange = (newColorValue: string) => {
        setInputValue(newColorValue);
        try {
            const newColor = new Color(newColorValue);
            onColorChange(newColor);
        } catch (error) {
            console.error('Invalid color input:', error);
        }
    };

    const colorInput = (
        <input
            type='color'
            value={color.toHex()}
            onChange={(e) => handleInputChange(e.target.value)}
            style={{ backgroundColor: color.toHex() }}
            className='w-10 h-10 duimask duimask-squircle cursor-pointer shadow'
        />
    );

    const textInput = (
        <label className='duiinput dueinput-bordered rounded-2xl flex items-center gap-2'>
            <input
                type='text'
                className='grow'
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder='Enter a color'
            />
        </label>
    );

    return (
        <div className='my-6 flex items-center justify-center space-x-2'>
            {inputPosition === 'left' ? colorInput : textInput}
            {inputPosition === 'left' ? textInput : colorInput}
        </div>
    );
};
