import { Color } from 'next-colors';
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
    <div className='mb-4'>
        <h3 className='text-sm font-semibold my-2 text-center'>{title}</h3>
        <div className='flex justify-center'>
            {colors.map((color, index) => (
                <ColorSwatch
                    key={index}
                    color={color}
                />
            ))}
        </div>
    </div>
);

const ColorHarmonies: React.FC<ColorHarmoniesProps> = ({ color }) => {
    return (
        <div className='flex-1 bg-white bg-opacity-90 text-gray-700 shadow-md rounded-lg py-4'>
            <h2 className='text-lg font-semibold my-4 text-center'>Color Harmonies</h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
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
                    title='Complementary'
                    colors={color.complementary()}
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
                    title='Tetradic'
                    colors={color.tetradic()}
                />
                <ColorSection
                    title='Double Split Complementary'
                    colors={color.doubleSplitComplementary()}
                />
                <ColorSection
                    title='Square'
                    colors={color.square()}
                />
            </div>
        </div>
    );
};

export default ColorHarmonies;
