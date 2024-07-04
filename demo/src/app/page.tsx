'use client';

import ColorSection from '@/components/color';
import ColorInput from '@/components/color-input';
import ColorMixer from '@/components/color-mixer';
import ColorPickerDemo from '@/components/color-picker';
import ConversionSection from '@/components/conversion';
import InstallElement from '@/components/install';
import Links from '@/components/links';
import ManipulationSection from '@/components/manipulation';
import { Color } from 'next-colors';
import { useEffect, useState } from 'react';

export default function Home() {
    const [color, setColor] = useState<Color>(new Color('#91EAEF'));
    const [backgroundStyle, setBackgroundStyle] = useState({});

    useEffect(() => {
        setBackgroundStyle({
            background: `radial-gradient(circle, ${color.toHex()} 0%, #1f2937 100%)`,
        });
    }, [color]);

    return (
        <div
            className='min-h-screen pb-32 justify-center'
            style={backgroundStyle}>
            <div className='max-w-[90vw] mx-auto px-4'>
                <Links />
                <InstallElement />
                <h1 className='text-2xl font-bold mb-4 text-center text-white'>next-colors demo</h1>
                <p className='text-center text-sm mb-4 text-white'>
                    Enter any valid color format: HEX, RGB, HSL, HSV, CMYK, LAB, or LCH
                </p>
                <ColorInput
                    color={color}
                    onColorChange={setColor}
                />

                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1 flex-col justify-center bg-white bg-opacity-90 text-gray-700 shadow-md rounded-lg py-4'>
                        <h3 className='text-lg font-semibold my-4 text-center'>Color Conversions</h3>
                        <div className='flex flex-col justify-center'>
                            <ConversionSection color={color} />
                        </div>
                    </div>

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
                                title='Compound'
                                colors={color.compound()}
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
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1'>
                        <ManipulationSection
                            color={color}
                            setColor={setColor}
                        />
                    </div>
                    <div className='flex-1'>
                        <ColorMixer />
                    </div>
                </div>
                <ColorPickerDemo
                    color={color}
                    setColor={setColor}
                />
            </div>
        </div>
    );
}
