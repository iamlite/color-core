import React, { useEffect, useRef, useState } from 'react';
import { hsvToRgb, rgbToHsv } from '../conversions';
import { HSV, RGB } from '../types';
import defaultStyles from './color-picker-styles';

/**
 * Props for the ColorPicker component.
 */
export interface ColorPickerProps {
    /** Initial color value in RGB format */
    initialColor?: RGB;
    /** Callback function triggered when the color changes */
    onChange?: (color: RGB) => void;
    /** Custom class name for the main container */
    className?: string;
    /** Custom inline styles for the main container */
    style?: React.CSSProperties;
    /** Width of the color picker */
    width?: number | string;
    /** Height of the color picker */
    height?: number | string;
    /** Height of the hue slider */
    hueSliderHeight?: number | string;
    /** Custom class name for the saturation-value area */
    saturationValueAreaClassName?: string;
    /** Custom class name for the saturation-value cursor */
    saturationValueCursorClassName?: string;
    /** Custom class name for the hue slider */
    hueSliderClassName?: string;
    /** Custom class name for the hue slider cursor */
    hueSliderCursorClassName?: string;
    /** Custom class name for the hex input field */
    inputClassName?: string;
    /** Custom class name for the color preview box */
    previewClassName?: string;
    /** Custom class name for the outer container */
    containerClassName?: string;
    /** Custom inline styles for the outer container */
    containerStyle?: React.CSSProperties;
}

/**
 * A customizable color picker component for Next.js projects.
 *
 * @param props - The component props
 * @returns A React component
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
    initialColor = { r: 255, g: 0, b: 0 },
    onChange,
    className = '',
    style = {},
    width = 350,
    height = 300,
    hueSliderHeight = 20,
    saturationValueAreaClassName = '',
    saturationValueCursorClassName = '',
    hueSliderClassName = '',
    hueSliderCursorClassName = '',
    inputClassName = '',
    previewClassName = '',
    containerClassName = '',
    containerStyle = {},
}) => {
    const [color, setColor] = useState<RGB>(initialColor);
    const [hsv, setHsv] = useState<HSV>(rgbToHsv(initialColor));
    const saturationValueRef = useRef<HTMLDivElement>(null);
    const hueSliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onChange?.(color);
    }, [color, onChange]);

    /**
     * Handles changes in the saturation-value area.
     *
     * @param event - The mouse event
     */
    const handleSaturationValueChange = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (!saturationValueRef.current) return;
        const rect = saturationValueRef.current.getBoundingClientRect();
        const s = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        const v = Math.max(0, Math.min(100, 100 - ((event.clientY - rect.top) / rect.height) * 100));
        const newHsv = { ...hsv, s, v };
        setHsv(newHsv);
        setColor(hsvToRgb(newHsv));
    };

    /**
     * Handles changes in the hue slider.
     *
     * @param event - The mouse event
     */
    const handleHueChange = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (!hueSliderRef.current) return;
        const rect = hueSliderRef.current.getBoundingClientRect();
        const h = Math.max(0, Math.min(360, ((event.clientX - rect.left) / rect.width) * 360));
        const newHsv = { ...hsv, h };
        setHsv(newHsv);
        setColor(hsvToRgb(newHsv));
    };

    /**
     * Handles changes in the hex input field.
     *
     * @param event - The input change event
     */
    const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const hex = event.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            setColor({ r, g, b });
            setHsv(rgbToHsv({ r, g, b }));
        }
    };

    /**
     * Converts RGB color to hex string.
     *
     * @param rgb - The RGB color to convert
     * @returns The hex string representation of the color
     */
    const toHex = (rgb: RGB): string => {
        return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
    };

    return (
        <div
            style={{ ...defaultStyles.container.style, ...containerStyle }}
            className={`${defaultStyles.container.className} ${containerClassName}`}>
            <div
                style={{ ...defaultStyles.colorPicker.style, ...style, width, height }}
                className={`${defaultStyles.colorPicker.className} ${className}`}>
                <div
                    ref={saturationValueRef}
                    style={{
                        ...defaultStyles.saturationValueArea.style,
                        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))`,
                    }}
                    className={`${defaultStyles.saturationValueArea.className} ${saturationValueAreaClassName}`}
                    onMouseDown={handleSaturationValueChange}
                    onMouseMove={(e): void => {
                        if (e.buttons === 1) handleSaturationValueChange(e);
                    }}>
                    <div
                        style={{
                            ...defaultStyles.saturationValueCursor.style,
                            left: `${hsv.s}%`,
                            top: `${100 - hsv.v}%`,
                        }}
                        className={`${defaultStyles.saturationValueCursor.className} ${saturationValueCursorClassName}`}
                    />
                </div>
                <div
                    ref={hueSliderRef}
                    style={{
                        ...defaultStyles.hueSlider.style,
                        height: hueSliderHeight,
                    }}
                    className={`${defaultStyles.hueSlider.className} ${hueSliderClassName}`}
                    onMouseDown={handleHueChange}
                    onMouseMove={(e): void => {
                        if (e.buttons === 1) handleHueChange(e);
                    }}>
                    <div
                        style={{
                            ...defaultStyles.hueSliderCursor.style,
                            left: `${(hsv.h / 360) * 100}%`,
                        }}
                        className={`${defaultStyles.hueSliderCursor.className} ${hueSliderCursorClassName}`}
                    />
                </div>
                <div
                    style={defaultStyles.colorInputs.style}
                    className={defaultStyles.colorInputs.className}>
                    <input
                        type='text'
                        value={toHex(color)}
                        onChange={handleHexChange}
                        style={defaultStyles.hexInput.style}
                        className={`${defaultStyles.hexInput.className} ${inputClassName}`}
                    />
                    <div
                        style={{
                            ...defaultStyles.colorPreview.style,
                            backgroundColor: toHex(color),
                        }}
                        className={`${defaultStyles.colorPreview.className} ${previewClassName}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
