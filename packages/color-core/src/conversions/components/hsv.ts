import { HSV, RGB } from '../../types';

/**
 * Converts HSV values to RGB values.
 * @param {HSV} hsv - An object with h, s, and v properties.
 * @returns {RGB} An object with r, g, and b properties.
 * @throws {Error} If the input is not a valid HSV object or if HSV values are out of range.
 */
export function hsvToRgb(hsv: HSV): RGB {
    if (typeof hsv !== 'object' || hsv === null) {
        throw new Error('Input must be an object');
    }

    let { h, s, v } = hsv;

    if (typeof h !== 'number' || typeof s !== 'number' || typeof v !== 'number') {
        throw new Error('HSV values must be numbers');
    }

    if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
        throw new Error('Invalid HSV values: h must be [0, 360], s and v must be [0, 100]');
    }

    s /= 100;
    v /= 100;
    h /= 60;

    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));

    let r = 0, g = 0, b = 0; // Initialize r, g, b to 0

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/**
 * Converts RGB values to HSV values.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {HSV} An object with h, s, and v properties.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToHsv(rgb: RGB): HSV {
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
    const d = max - min;
    let h = 0; // Initialize h to 0
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
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
        v: Math.round(v * 100)
    };
}
