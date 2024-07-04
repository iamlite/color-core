import { Color } from 'next-colors';
import React, { useState } from 'react';
import ColorInput from './color-input';

const ColorMixer: React.FC = () => {
    const [color1, setColor1] = useState(new Color('#00D0FF'));
    const [color2, setColor2] = useState(new Color('#FCD248'));
    const [mixAmount, setMixAmount] = useState(0.5);

    const mixedColor = color1.mix(color2, mixAmount);

    return (
        <div className='flex-1 bg-white bg-opacity-90 text-gray-700 shadow-md rounded-lg p-4 mt-4 h-full'>
            <h2 className='text-lg font-semibold my-4 text-center'>Color Mixer</h2>
            <div className='flex flex-col md:flex-row justify-around items-center'>
                <div>
                    <h3 className='text-center mb-2'>Color 1</h3>

                    <ColorInput
                        color={color1}
                        onColorChange={setColor1}
                    />
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <div className='text-center'>
                        <h3 className='mb-2'>Mixed Color</h3>
                        <div
                            className='w-20 h-20 rounded-lg shadow-md mx-auto'
                            style={{ backgroundColor: mixedColor.toHex() }}></div>
                        <p className='mt-2'>{mixedColor.toHex()}</p>
                    </div>
                </div>
                <div>
                    <h3 className='text-center mb-2'>Color 2</h3>

                    <ColorInput
                        color={color2}
                        onColorChange={setColor2}
                    />
                </div>
            </div>
            <div className='my-4'>
                <label className='duilabel'>
                    <span className='duilabel-text'>Mix Amount</span>
                    <span className='duilabel-text-alt'>{(mixAmount * 100).toFixed(0)}%</span>
                </label>
                <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={mixAmount}
                    onChange={(e) => setMixAmount(Number(e.target.value))}
                    className='duirange duirange-xs'
                    style={{ '--range-shdw': mixedColor } as React.CSSProperties}
                />
            </div>
        </div>
    );
};

export default ColorMixer;
