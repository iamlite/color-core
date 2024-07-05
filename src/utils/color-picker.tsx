import React, { useCallback, useEffect, useRef, useState } from 'react';
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
 * This component provides a user interface for selecting colors, including:
 * - A saturation-value area for picking the color's saturation and brightness
 * - A hue slider for selecting the base hue
 * - An input field for entering hex color values
 * - A color preview box
 *
 * The component is highly customizable through props, allowing for custom styling
 * and dimensions to fit various design requirements.
 *
 * @example
 * ```jsx
 * <ColorPicker
 *   initialColor={{ r: 255, g: 0, b: 0 }}
 *   onChange={(color) => console.log(color)}
 *   width={300}
 *   height={200}
 * />
 * ```
 *
 * @see {@link ColorPickerProps} for detailed prop descriptions
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
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Debounces the onChange callback to prevent excessive updates.
     * This function creates a small delay before calling the onChange prop,
     * which helps to improve performance when the color is changing rapidly.
     *
     * @param newColor - The new RGB color value to be passed to the onChange callback
     */
    const debouncedOnChange = useCallback(
        (newColor: RGB) => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
            updateTimeoutRef.current = setTimeout(() => {
                onChange?.(newColor);
            }, 10);
        },
        [onChange]
    );

    /**
     * Effect hook to trigger the onChange callback when the color changes.
     * This ensures that the parent component is notified of color changes.
     */
    useEffect(() => {
        debouncedOnChange(color);
    }, [color, debouncedOnChange]);

    /**
     * Handles changes in the saturation-value area.
     * Updates the color based on the mouse position within the saturation-value area.
     *
     * @param event - The mouse event from interacting with the saturation-value area
     */
    const handleSaturationValueChange = useCallback(
        (event: React.MouseEvent<HTMLDivElement>): void => {
            if (!saturationValueRef.current) return;
            const rect = saturationValueRef.current.getBoundingClientRect();
            const s = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
            const v = Math.max(0, Math.min(100, 100 - ((event.clientY - rect.top) / rect.height) * 100));
            const newHsv = { ...hsv, s, v };
            setHsv(newHsv);
            setColor(hsvToRgb(newHsv));
        },
        [hsv]
    );

    /**
     * Handles changes in the hue slider.
     * Updates the color based on the mouse position along the hue slider.
     *
     * @param event - The mouse event from interacting with the hue slider
     */
    const handleHueChange = useCallback(
        (event: React.MouseEvent<HTMLDivElement>): void => {
            if (!hueSliderRef.current) return;
            const rect = hueSliderRef.current.getBoundingClientRect();
            const h = Math.max(0, Math.min(360, ((event.clientX - rect.left) / rect.width) * 360));
            const newHsv = { ...hsv, h };
            setHsv(newHsv);
            setColor(hsvToRgb(newHsv));
        },
        [hsv]
    );

    /**
     * Handles changes in the hex input field.
     * Validates the input and updates the color if a valid hex value is entered.
     *
     * @param event - The input change event from the hex input field
     */
    const handleHexChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const hex = event.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            setColor({ r, g, b });
            setHsv(rgbToHsv({ r, g, b }));
        }
    }, []);

    /**
     * Converts an RGB color value to its hexadecimal string representation.
     *
     * @param rgb - The RGB color to convert
     * @returns The hex string representation of the color (e.g., "#FF0000" for red)
     */
    const toHex = useCallback((rgb: RGB): string => {
        return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
    }, []);

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
