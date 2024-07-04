import { HSV, RGB } from '../../types';

/**
 * Converts RGB values to HSV values.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {HSV} An object with h, s, and v properties.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToHsv(rgb: RGB): HSV {
    if (typeof rgb !== 'object' || rgb === null) {
        throw new Error('Input must be an object');
    }

    let { r, g, b } = rgb;

    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
        throw new Error('RGB values must be numbers');
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('RGB values must be between 0 and 255');
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h: number;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: h = 0; // This should never happen, but TypeScript wants it
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}