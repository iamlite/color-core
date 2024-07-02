import { LAB, RGB } from '../types';

/**
 * Converts LAB color to RGB color space.
 * @param {LAB} lab - The LAB color to convert.
 * @returns {RGB} The color in RGB color space.
 * @throws {Error} If the input is not a valid LAB object.
 */
export function labToRgb(lab: LAB): RGB {
    if (typeof lab !== 'object' || lab === null) {
        throw new Error('Input must be an object');
    }

    const { l, a, b } = lab;

    if (typeof l !== 'number' || typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('LAB values must be numbers');
    }

    // Convert LAB to XYZ
    let y = (l + 16) / 116;
    let x = a / 500 + y;
    let z = y - b / 200;

    const y3 = Math.pow(y, 3);
    const x3 = Math.pow(x, 3);
    const z3 = Math.pow(z, 3);

    y = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
    x = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
    z = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;

    x *= 95.047;
    y *= 100.000;
    z *= 108.883;

    // Convert XYZ to RGB
    let rLinear = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let gLinear = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let bLinear = x * 0.0557 + y * -0.2040 + z * 1.0570;

    rLinear = rLinear > 0.0031308 ? 1.055 * Math.pow(rLinear, 1 / 2.4) - 0.055 : 12.92 * rLinear;
    gLinear = gLinear > 0.0031308 ? 1.055 * Math.pow(gLinear, 1 / 2.4) - 0.055 : 12.92 * gLinear;
    bLinear = bLinear > 0.0031308 ? 1.055 * Math.pow(bLinear, 1 / 2.4) - 0.055 : 12.92 * bLinear;

    return {
        r: Math.max(0, Math.min(255, Math.round(rLinear * 255))),
        g: Math.max(0, Math.min(255, Math.round(gLinear * 255))),
        b: Math.max(0, Math.min(255, Math.round(bLinear * 255)))
    };
}