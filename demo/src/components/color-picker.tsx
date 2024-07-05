import { Color, ColorPicker, RGB } from 'next-colors';
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
        <div className='flex flex-col md:flex-row gap-8 p-8 my-8 rounded-2xl bg-gray-100'>
            <div className='flex-1'>
                <h2 className='text-lg font-semibold text-center'>Unstyled Color Picker</h2>
                <ColorPicker
                    initialColor={color.toRgb()}
                    onChange={handleColorChange}
                />
            </div>
            <div className='flex-1 justify-center'>
                <h2 className='text-lg font-semibold text-center'>Styled With Tailwind CSS</h2>
                <ColorPicker
                    initialColor={color.toRgb()}
                    containerClassName='rounded-2xl shadow-lg'
                    containerStyle={{ minHeight: 'auto' }}
                    className='bg-zinc-800 rounded-2xl shadow-lg'
                    width={500}
                    height={400}
                    saturationValueAreaClassName='rounded-2xl shadow-inner'
                    saturationValueCursorClassName='border-2 border-white shadow-md'
                    hueSliderClassName='rounded-xl shadow-inner'
                    hueSliderHeight={40}
                    hueSliderCursorClassName='rounded-full bg-white shadow-md border-2 border-gray-300'
                    inputClassName='duiinput duiinput-bordered rounded-2xl w-full uppercase text-center text-xs'
                    previewClassName='duimask duimask-squircle'
                />
            </div>
        </div>
    );
};

export default ColorPickerDemo;
