import { CMYK, RGB } from '../types';

/**
 * Converts RGB values to CMYK values.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {CMYK} An object with c, m, y, and k properties.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToCmyk(rgb: RGB): CMYK {
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

    const rRatio = r / 255;
    const gRatio = g / 255;
    const bRatio = b / 255;

    const k = 1 - Math.max(rRatio, gRatio, bRatio);
    const c = (1 - rRatio - k) / (1 - k) || 0;
    const m = (1 - gRatio - k) / (1 - k) || 0;
    const y = (1 - bRatio - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}