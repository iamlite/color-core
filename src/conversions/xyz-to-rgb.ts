import { XYZ, RGB } from '../types';

/**
 * Converts XYZ color values to RGB color space.
 * @param {XYZ} xyz - The XYZ color to convert.
 * @returns {RGB} The color in RGB color space.
 * @throws {Error} If the input is not a valid XYZ object.
 */
export function xyzToRgb(xyz: XYZ): RGB {
    if (typeof xyz !== 'object' || xyz === null) {
        throw new Error('Input must be an object');
    }

    const { x, y, z } = xyz;

    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
        throw new Error('XYZ values must be numbers');
    }

    let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let b = x * 0.0557 + y * -0.2040 + z * 1.0570;

    // Convert to sRGB
    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

    return {
        r: Math.max(0, Math.min(255, Math.round(r * 255))),
        g: Math.max(0, Math.min(255, Math.round(g * 255))),
        b: Math.max(0, Math.min(255, Math.round(b * 255)))
    };
}
