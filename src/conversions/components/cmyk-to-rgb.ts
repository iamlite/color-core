import { CMYK, RGB } from '../../types';

/**
 * Converts CMYK values to RGB values.
 * @param {CMYK} cmyk - An object with c, m, y, and k properties.
 * @returns {RGB} An object with r, g, and b properties.
 * @throws {Error} If the input is not a valid CMYK object or if CMYK values are out of range.
 */
export function cmykToRgb(cmyk: CMYK): RGB {
    if (typeof cmyk !== 'object' || cmyk === null) {
        throw new Error('Input must be an object');
    }

    const { c, m, y, k } = cmyk;

    if (typeof c !== 'number' || typeof m !== 'number' || typeof y !== 'number' || typeof k !== 'number') {
        throw new Error('CMYK values must be numbers');
    }

    if (c < 0 || c > 100 || m < 0 || m > 100 || y < 0 || y > 100 || k < 0 || k > 100) {
        throw new Error('CMYK values must be between 0 and 100');
    }

    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);

    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };
}