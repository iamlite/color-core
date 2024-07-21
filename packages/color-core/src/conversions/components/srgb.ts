import { RGB, SRGB } from '../../types';

/**
 * Converts RGB color values to sRGB color space.
 * @param {RGB} rgb - The RGB color to convert.
 * @returns {sRGB} The color in sRGB color space.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToSrgb(rgb: RGB): SRGB {
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

    // Normalize RGB values to 0-1 range
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    // Apply gamma correction
    const gammaCorrect = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    return {
        sr: gammaCorrect(rNorm),
        sg: gammaCorrect(gNorm),
        sb: gammaCorrect(bNorm),
    };
}

/**
 * Converts sRGB color values to RGB color space.
 * @param {sRGB} srgb - The sRGB color to convert.
 * @returns {RGB} The color in RGB color space.
 * @throws {Error} If the input is not a valid sRGB object or if sRGB values are out of range.
 */
export function srgbToRgb(srgb: SRGB): RGB {
    if (typeof srgb !== 'object' || srgb === null) {
        throw new Error('Input must be an object');
    }

    const { sr, sg, sb } = srgb;

    if (typeof sr !== 'number' || typeof sg !== 'number' || typeof sb !== 'number') {
        throw new Error('sRGB values must be numbers');
    }

    if (sr < 0 || sr > 1 || sg < 0 || sg > 1 || sb < 0 || sb > 1) {
        throw new Error('sRGB values must be between 0 and 1');
    }

    // Apply inverse gamma correction
    const inverseGammaCorrect = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

    return {
        r: Math.round(inverseGammaCorrect(sr) * 255),
        g: Math.round(inverseGammaCorrect(sg) * 255),
        b: Math.round(inverseGammaCorrect(sb) * 255),
    };
}
