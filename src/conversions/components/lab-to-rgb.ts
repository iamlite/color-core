import { LAB, RGB } from '../../types';

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

    const { l, a, b: bValue } = lab;

    if (typeof l !== 'number' || typeof a !== 'number' || typeof bValue !== 'number') {
        throw new Error('LAB values must be numbers');
    }

    let y = (l + 16) / 116;
    let x = a / 500 + y;
    let z = y - bValue / 200;

    const delta = 6 / 29;
    const deltaSquared = delta * delta;
    const deltaCubed = deltaSquared * delta;

    x = 0.95047 * ((x > delta) ? x * x * x : 3 * deltaSquared * (x - 4 / 29));
    y = 1.00000 * ((y > delta) ? y * y * y : 3 * deltaSquared * (y - 4 / 29));
    z = 1.08883 * ((z > delta) ? z * z * z : 3 * deltaSquared * (z - 4 / 29));

    let r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    let g = x * -0.9692660 + y * 1.8760108 + z * 0.0415560;
    let b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

    return {
        r: Math.round(Math.max(0, Math.min(255, r * 255))),
        g: Math.round(Math.max(0, Math.min(255, g * 255))),
        b: Math.round(Math.max(0, Math.min(255, b * 255)))
    };
}