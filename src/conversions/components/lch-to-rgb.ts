import { LAB, LCH, RGB } from '../../types';
import { labToRgb } from './lab-to-rgb';

/**
 * Converts LCH color to RGB color space.
 * @param {LCH} lch - The LCH color to convert.
 * @returns {RGB} The color in RGB color space.
 * @throws {Error} If the input is not a valid LCH object.
 */
export function lchToRgb(lch: LCH): RGB {
    if (typeof lch !== 'object' || lch === null) {
        throw new Error('Input must be an object');
    }

    const { l, c, h } = lch;

    if (typeof l !== 'number' || typeof c !== 'number' || typeof h !== 'number') {
        throw new Error('LCH values must be numbers');
    }

    const hRadians = h * (Math.PI / 180);
    const a = c * Math.cos(hRadians);
    const b = c * Math.sin(hRadians);

    const lab: LAB = { l, a, b };
    return labToRgb(lab);
}
