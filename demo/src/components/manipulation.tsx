import { Color } from 'next-colors';
import React, { useEffect, useState } from 'react';

interface ManipulationSectionProps {
    color: Color;
    setColor: (color: Color) => void;
}

const ManipulationSection: React.FC<ManipulationSectionProps> = ({ color, setColor }) => {
    const [lightnessAmount, setLightnessAmount] = useState(50);
    const [saturationAmount, setSaturationAmount] = useState(100);
    const [hueAmount, setHueAmount] = useState(0);
    const [alphaAmount, setAlphaAmount] = useState(1);

    useEffect(() => {
        const hsl = color.toHsl();
        setLightnessAmount(hsl.l);
        setSaturationAmount(hsl.s);
        setHueAmount(hsl.h);
        setAlphaAmount(color.toRgb().a ?? 1);
    }, [color]);

    const handleLightnessChange = (value: number) => {
        setLightnessAmount(value);
        const hsl = color.toHsl();
        setColor(new Color({ ...hsl, l: value }));
    };

    const handleSaturationChange = (value: number) => {
        setSaturationAmount(value);
        const hsl = color.toHsl();
        setColor(new Color({ ...hsl, s: value }));
    };

    const handleHueChange = (value: number) => {
        const newHue = value % 360;
        setHueAmount(newHue);
        const hsl = color.toHsl();
        setColor(new Color({ ...hsl, h: newHue }));
    };

    const handleAlphaChange = (value: number) => {
        setAlphaAmount(value);
        const rgb = color.toRgb();
        setColor(new Color({ ...rgb, a: value }));
    };

    const resetColor = () => {
        const hsl = color.toHsl();
        setLightnessAmount(hsl.l);
        setSaturationAmount(hsl.s);
        setHueAmount(hsl.h);
        setAlphaAmount(color.toRgb().a ?? 1);
    };

    return (
        <div className='flex-1 bg-white bg-opacity-90 text-gray-700 shadow-md rounded-lg py-10 my-4 h-full'>
            <h2 className='text-lg font-semibold text-center'>Color Manipulations</h2>
            <div className='flex flex-col md:flex-row items-center justify-center h-full'>
                <div className='w-full md:w-1/2 space-y-4 px-10'>
                    <div>
                        <label className='duilabel'>
                            <span className='duilabel-text'>Lightness</span>
                            <span className='duilabel-text-alt'>{lightnessAmount.toFixed(0)}%</span>
                        </label>
                        <input
                            type='range'
                            min='0'
                            max='100'
                            value={lightnessAmount}
                            className='duirange duirange-xs'
                            step='1'
                            style={{ '--range-shdw': color.toHex() } as React.CSSProperties}
                            onChange={(e) => handleLightnessChange(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className='duilabel'>
                            <span className='duilabel-text'>Saturation</span>
                            <span className='duilabel-text-alt'>{saturationAmount.toFixed(0)}%</span>
                        </label>
                        <input
                            type='range'
                            min='0'
                            max='100'
                            value={saturationAmount}
                            className='duirange duirange-xs'
                            step='1'
                            style={{ '--range-shdw': color.toHex() } as React.CSSProperties}
                            onChange={(e) => handleSaturationChange(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className='duilabel'>
                            <span className='duilabel-text'>Hue</span>
                            <span className='duilabel-text-alt'>{hueAmount.toFixed(0)}°</span>
                        </label>
                        <input
                            type='range'
                            min='0'
                            max='359'
                            value={hueAmount}
                            className='duirange duirange-xs'
                            step='1'
                            style={{ '--range-shdw': color.toHex() } as React.CSSProperties}
                            onChange={(e) => handleHueChange(Number(e.target.value))}
                        />
                    </div>
                    {/* <div>
                    <label className='label'>
                        <span className='label-text'>Alpha</span>
                        <span className='label-text-alt'>{alphaAmount.toFixed(2)}</span>
                    </label>
                    <input
                        type='range'
                        min='0'
                        max='1'
                        value={alphaAmount}
                        className='range range-xs'
                        step='0.01'
                        onChange={(e) => handleAlphaChange(Number(e.target.value))}
                    />
                </div> */}
                </div>
                <div className='w-full md:w-1/2 px-10 flex flex-col items-center justify-center space-y-4 mt-4 md:mt-0'>
                    <button
                        className='duibtn duibtn-block duibtn-warning'
                        onClick={resetColor}>
                        Reset
                    </button>
                    <button
                        className='duibtn duibtn-block duibtn-ghost border-b-zinc-800'
                        onClick={() => setColor(color.invert())}>
                        Invert
                    </button>
                    <button
                        className='duibtn duibtn-block duibtn-outline'
                        onClick={() => setColor(color.grayscale())}>
                        Grayscale
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManipulationSection;
