import { LAB, RGB } from '../types';

/**
 * Converts RGB color to LAB color space.
 * @param {RGB} rgb - The RGB color to convert.
 * @returns {LAB} The color in LAB color space.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToLab(rgb: RGB): LAB {
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

    // Convert RGB to XYZ
    let rLinear = r / 255;
    let gLinear = g / 255;
    let bLinear = b / 255;

    rLinear = rLinear > 0.04045 ? Math.pow((rLinear + 0.055) / 1.055, 2.4) : rLinear / 12.92;
    gLinear = gLinear > 0.04045 ? Math.pow((gLinear + 0.055) / 1.055, 2.4) : gLinear / 12.92;
    bLinear = bLinear > 0.04045 ? Math.pow((bLinear + 0.055) / 1.055, 2.4) : bLinear / 12.92;

    const x = (rLinear * 0.4124 + gLinear * 0.3576 + bLinear * 0.1805) * 100;
    const y = (rLinear * 0.2126 + gLinear * 0.7152 + bLinear * 0.0722) * 100;
    const z = (rLinear * 0.0193 + gLinear * 0.1192 + bLinear * 0.9505) * 100;

    // Convert XYZ to LAB
    const xn = 95.047;
    const yn = 100.000;
    const zn = 108.883;

    const fx = x / xn > 0.008856 ? Math.pow(x / xn, 1 / 3) : (7.787 * x / xn) + 16 / 116;
    const fy = y / yn > 0.008856 ? Math.pow(y / yn, 1 / 3) : (7.787 * y / yn) + 16 / 116;
    const fz = z / zn > 0.008856 ? Math.pow(z / zn, 1 / 3) : (7.787 * z / zn) + 16 / 116;

    const l = (116 * fy) - 16;
    const a = 500 * (fx - fy);
    const bLab = 200 * (fy - fz);

    return { l, a, b: bLab };
}