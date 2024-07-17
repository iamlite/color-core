import { HSI, RGB } from '../../types';

/**
 * Converts HSI values to RGB color space.
 * @param {HSI} hsi - The HSI color to convert.
 * @returns {RGB} The color in RGB space.
 */
export function hsiToRgb(hsi: HSI): RGB {
    const h = hsi.h;
    const s = hsi.s / 100;
    const i = hsi.i / 100;

    const hPrime = h / 60;
    const z = 1 - Math.abs(hPrime % 2 - 1);
    const chroma = 3 * i * s / (1 + z);
    const x = chroma * z;

    let r = 0, g = 0, b = 0;

    if (hPrime >= 0 && hPrime < 1) {
        [r, g, b] = [chroma, x, 0];
    } else if (hPrime >= 1 && hPrime < 2) {
        [r, g, b] = [x, chroma, 0];
    } else if (hPrime >= 2 && hPrime < 3) {
        [r, g, b] = [0, chroma, x];
    } else if (hPrime >= 3 && hPrime < 4) {
        [r, g, b] = [0, x, chroma];
    } else if (hPrime >= 4 && hPrime < 5) {
        [r, g, b] = [x, 0, chroma];
    } else if (hPrime >= 5 && hPrime < 6) {
        [r, g, b] = [chroma, 0, x];
    }

    const m = i * (1 - s);
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}


/**
 * Converts RGB values to HSI color space.
 * @param {RGB} rgb - The RGB color to convert.
 * @returns {HSI} The color in HSI space.
 */
export function rgbToHsi(rgb: RGB): HSI {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const i = (r + g + b) / 3;
    const s = i > 0 ? 1 - Math.min(r, g, b) / i : 0;

    let h = 0;
    if (s !== 0) {
        const numerator = 0.5 * ((r - g) + (r - b));
        const denominator = Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
        h = Math.acos(numerator / denominator);
        if (b > g) {
            h = 2 * Math.PI - h;
        }
        h *= 180 / Math.PI;
    }

    return { h, s: s * 100, i: i * 100 };
}
