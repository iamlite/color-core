import { RGB } from '../../types';

/**
 * Converts RGB values to a hex color code.
 * @param {RGB} rgb - An object with r, g, and b properties, and an optional a property.
 * @param {boolean} [includeAlpha=false] - Whether to include the alpha channel in the hex string.
 * @returns {string} The hex color code.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToHex(rgb: RGB, includeAlpha: boolean = false): string {
    if (typeof rgb !== 'object' || rgb === null) {
        throw new Error('Input must be an object');
    }
    const { r, g, b, a } = rgb;
    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
        throw new Error('RGB values must be numbers');
    }
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('RGB values must be between 0 and 255');
    }
    if (includeAlpha && a !== undefined && (typeof a !== 'number' || a < 0 || a > 1)) {
        throw new Error('Alpha value must be a number between 0 and 1');
    }

    const toHex = (value: number): string => Math.round(value).toString(16).padStart(2, '0');
    let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    if (includeAlpha && a !== undefined) {
        // Handle edge cases for alpha
        let alphaHex;
        if (a <= 0.004) {
            alphaHex = '01'; // Smallest non-zero alpha
        } else if (a >= 0.996) {
            alphaHex = 'fe'; // Largest non-ff alpha
        } else {
            alphaHex = toHex(Math.round(a * 255));
        }
        hex += alphaHex;
    }

    return hex;
}