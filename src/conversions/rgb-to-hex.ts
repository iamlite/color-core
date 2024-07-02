import { RGB } from '../types';

/**
 * Converts RGB values to a hex color code.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {string} The hex color code.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToHex(rgb: RGB): string {
    if (typeof rgb !== 'object' || rgb === null) {
        throw new Error('Input must be an object');
    }

    const { r, g, b } = rgb;

    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
        throw new Error('RGB values must be numbers');
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('RGB values must be between 0 and 255');
    }

    const toHex = (value: number): string => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}