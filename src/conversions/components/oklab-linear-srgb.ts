import { Oklab } from '../../types';

/**
 * Converts Oklab color values to linear sRGB.
 * @param {number} L - The L component of Oklab.
 * @param {number} a - The a component of Oklab.
 * @param {number} b - The b component of Oklab.
 * @returns {[number, number, number]} An array of [r, g, b] values in linear sRGB color space (0-1).
 */
export function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    ];
}


/**
 * Converts linear sRGB values to Oklab color space.
 * @param {number} r - The red channel of linear sRGB (0-1).
 * @param {number} g - The green channel of linear sRGB (0-1).
 * @param {number} b - The blue channel of linear sRGB (0-1).
 * @returns {Oklab} An object with L, a, and b properties in Oklab color space.
 */
export function linearSrgbToOklab(r: number, g: number, b: number): Oklab {
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    };
}
