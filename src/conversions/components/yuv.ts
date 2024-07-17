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

    // Allow some flexibility in YUV ranges
    y = Math.max(-128, Math.min(255.5, y));
    u = Math.max(-128, Math.min(255.5, u));
    v = Math.max(-128, Math.min(255.5, v));

    // Convert YUV to RGB using the provided formulas
    let r = y + 1.4075 * (v - 128);
    let g = y - 0.3455 * (u - 128) - (0.7169 * (v - 128));
    let b = y + 1.7790 * (u - 128);

    // Clamp RGB values to 0-255 range and round to nearest integer
    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));

    return { r, g, b };
}

/**
 * Converts RGB color values to YUV color space.
 * @param {RGB} rgb - The RGB color to convert.
 * @returns {YUV} The color in YUV color space.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToYuv(rgb: RGB): YUV {
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

    // Convert RGB to YUV using the provided formulas
    const y = r * 0.299 + g * 0.587 + b * 0.114;
    const u = r * -0.168736 + g * -0.331264 + b * 0.5 + 128;
    const v = r * 0.5 + g * -0.418688 + b * -0.081312 + 128;

    // Round YUV values to two decimal places
    return {
        y: Math.round(y * 100) / 100,
        u: Math.round(u * 100) / 100,
        v: Math.round(v * 100) / 100,
    };
}
