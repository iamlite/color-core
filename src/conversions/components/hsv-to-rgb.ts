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
