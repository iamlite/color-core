import { YUV, RGB } from '../types';

/**
 * Converts YUV color values to RGB color space.
 * @param {YUV} yuv - The YUV color to convert.
 * @returns {RGB} The color in RGB color space.
 * @throws {Error} If the input is not a valid YUV object.
 */
export function yuvToRgb(yuv: YUV): RGB {
    if (typeof yuv !== 'object' || yuv === null) {
        throw new Error('Input must be an object');
    }

    const { y, u, v } = yuv;

    if (typeof y !== 'number' || typeof u !== 'number' || typeof v !== 'number') {
        throw new Error('YUV values must be numbers');
    }

    const r = y + 1.13983 * v;
    const g = y - 0.39465 * u - 0.58060 * v;
    const b = y + 2.03211 * u;

    return {
        r: Math.max(0, Math.min(255, Math.round(r * 255))),
        g: Math.max(0, Math.min(255, Math.round(g * 255))),
        b: Math.max(0, Math.min(255, Math.round(b * 255)))
    };
}
