import { Oklab, RGB } from '../../types';
import { linearSrgbToSrgb, srgbToLinearSrgb } from './linear-srgb-srgb';
import { linearSrgbToOklab, oklabToLinearSrgb } from './oklab-linear-srgb';

/**
 * Converts Oklab color values to RGB.
 * @param {Oklab} oklab - An object with L, a, and b properties.
 * @returns {RGB} An object with r, g, and b properties.
 * @throws {Error} If the input is not a valid Oklab object.
 */
export function oklabToRgb(oklab: Oklab): RGB {
    if (typeof oklab !== 'object' || oklab === null) {
        throw new Error('Input must be an object');
    }

    const { L, a, b } = oklab;

    if (typeof L !== 'number' || typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Oklab values must be numbers');
    }

    const [r_linear, g_linear, b_linear] = oklabToLinearSrgb(L, a, b);

    return {
        r: linearSrgbToSrgb(r_linear),
        g: linearSrgbToSrgb(g_linear),
        b: linearSrgbToSrgb(b_linear)
    };
}

/**
 * Converts RGB values to Oklab color space.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {Oklab} An object with L, a, and b properties.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToOklab(rgb: RGB): Oklab {
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

    const r_linear = srgbToLinearSrgb(r);
    const g_linear = srgbToLinearSrgb(g);
    const b_linear = srgbToLinearSrgb(b);

    return linearSrgbToOklab(r_linear, g_linear, b_linear);
}
