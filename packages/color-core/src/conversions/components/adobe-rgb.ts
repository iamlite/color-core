import { AdobeRGB, RGB } from '../../types';

/**
 * Converts standard RGB values to Adobe RGB color space.
 * @param {RGB} rgb - The standard RGB color to convert.
 * @returns {AdobeRGB} The color in Adobe RGB space.
 */

export function rgbToAdobeRGB(rgb: RGB): AdobeRGB {
    // sRGB gamma correction (linearize)
    const linearize = (v: number): number => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const r = linearize(rgb.r);
    const g = linearize(rgb.g);
    const b = linearize(rgb.b);

    // sRGB to XYZ
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
    const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

    // XYZ to Adobe RGB
    let adobeR = x * 2.0413690 + y * -0.5649464 + z * -0.3446944;
    let adobeG = x * -0.9692660 + y * 1.8760108 + z * 0.0415560;
    let adobeB = x * 0.0134474 + y * -0.1183897 + z * 1.0154096;

    // Clip to prevent out-of-gamut values
    adobeR = Math.max(0, adobeR);
    adobeG = Math.max(0, adobeG);
    adobeB = Math.max(0, adobeB);

    // Adobe RGB gamma correction
    const gammaCorrect = (v: number): number => Math.pow(v, 1 / 2.19921875);

    return {
        ar: gammaCorrect(adobeR),
        ag: gammaCorrect(adobeG),
        ab: gammaCorrect(adobeB)
    };
}

/**
 * Converts Adobe RGB values to standard RGB color space.
 * @param {AdobeRGB} adobeRGB - The Adobe RGB color to convert.
 * @returns {RGB} The color in standard RGB space.
 */
export function adobeRGBToRGB(adobeRGB: AdobeRGB): RGB {
    const linearize = (v: number): number => Math.pow(v, 2.19921875);

    const r = linearize(adobeRGB.ar);
    const g = linearize(adobeRGB.ag);
    const b = linearize(adobeRGB.ab);

    const x = r * 0.57667 + g * 0.18556 + b * 0.18823;
    const y = r * 0.29734 + g * 0.62736 + b * 0.07529;
    const z = r * 0.02703 + g * 0.07069 + b * 0.99134;

    const srgbR = x * 3.2406 + y * -1.5372 + z * -0.4986;
    const srgbG = x * -0.9689 + y * 1.8758 + z * 0.0415;
    const srgbB = x * 0.0557 + y * -0.2040 + z * 1.0570;

    const gamma = (linear: number): number => {
        if (linear <= 0.0031308) {
            return linear * 12.92;
        }
        return 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
    };

    return {
        r: Math.round(Math.max(0, Math.min(255, gamma(srgbR) * 255))),
        g: Math.round(Math.max(0, Math.min(255, gamma(srgbG) * 255))),
        b: Math.round(Math.max(0, Math.min(255, gamma(srgbB) * 255)))
    };
}