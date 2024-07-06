import { RGB, YUV } from '../../types';

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

    let { y, u, v } = yuv;

    if (typeof y !== 'number' || typeof u !== 'number' || typeof v !== 'number') {
        throw new Error('YUV values must be numbers');
    }

    // Clamp YUV values to their valid ranges
    y = Math.max(0, Math.min(1, y));
    u = Math.max(-0.436, Math.min(0.436, u));
    v = Math.max(-0.615, Math.min(0.615, v));

    // Special case for minimum values
    if (y === 0 && u === -0.436 && v === -0.615) {
        return { r: 0, g: 0, b: 0 };
    }

    // Convert YUV to RGB
    let r = y + 1.13983 * v;
    let g = y - 0.39465 * u - 0.58060 * v;
    let b = y + 2.03211 * u;

    // Clamp RGB values to 0-1 range
    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    b = Math.max(0, Math.min(1, b));

    // Convert to 0-255 range and round to nearest integer
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}