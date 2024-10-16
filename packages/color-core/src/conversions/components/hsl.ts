import { HSL, RGB } from '../../types';

/**
 * Converts HSL values to RGB values.
 * @param {HSL} hsl - An object with h, s, and l properties.
 * @returns {RGB} An object with r, g, and b properties.
 * @throws {Error} If the input is not a valid HSL object or if HSL values are out of range.
 */
export function hslToRgb(hsl: HSL): RGB {
    if (typeof hsl !== 'object' || hsl === null) {
        throw new Error('Input must be an object');
    }

    const { h, s, l } = hsl;

    if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
        throw new Error('HSL values must be numbers');
    }

    if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
        throw new Error('Invalid HSL values: h must be [0, 360], s and l must be [0, 100]');
    }

    const hue = h / 360;
    const saturation = s / 100;
    const lightness = l / 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r, g, b;

    if (saturation === 0) {
        r = g = b = lightness;
    } else {
        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        r = hue2rgb(p, q, hue + 1 / 3);
        g = hue2rgb(p, q, hue);
        b = hue2rgb(p, q, hue - 1 / 3);
    }

    return {
        r: Math.round(r * 255 + 0.001), // Nudge the rounding
        g: Math.round(g * 255 + 0.001),
        b: Math.round(b * 255 + 0.001)
    };
}

/**
 * Converts RGB values to HSL values.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {HSL} An object with h, s, and l properties.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToHsl(rgb: RGB): HSL {
    if (typeof rgb !== 'object' || rgb === null) {
        throw new Error('Input must be an object');
    }

    let { r, g, b } = rgb;

    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
        throw new Error('RGB values must be numbers');
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('RGB values must be between 0 and 255');
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2; // Initialize h to 0

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}