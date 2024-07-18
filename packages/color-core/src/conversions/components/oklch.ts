import { Oklab, Oklch, RGB } from '../../types';
import { oklabToRgb, rgbToOklab } from './oklab';

export interface RawOklch {
    L: number; // Decimal (0-1)
    C: number; // Decimal
    h: number; // Decimal (0-360)
}

/**
 * Converts RGB values to formatted Oklch color space.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {Oklch} An object with L (percentage), C and h (full numbers) properties.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToOklch(rgb: RGB): Oklch {
    const oklab = rgbToOklab(rgb);
    const { L, a, b } = oklab;

    const C = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * 180) / Math.PI;

    // Ensure h is always between 0 and 360
    h = ((h % 360) + 360) % 360;

    // Handle the case where C is very close to zero
    if (C < 1e-6) {
        h = 0;
    }

    return {
        L: Number((L * 100).toFixed(2)),
        C: Number((C * 100).toFixed(4)),
        h: Number(h.toFixed(2))
    };
}

/**
 * Converts RGB values to raw Oklch color space.
 * @param {RGB} rgb - An object with r, g, and b properties.
 * @returns {RawOklch} An object with L, C, and h properties in raw decimal form.
 * @throws {Error} If the input is not a valid RGB object or if RGB values are out of range.
 */
export function rgbToRawOklch(rgb: RGB): RawOklch {
    const oklab = rgbToOklab(rgb);
    const { L, a, b } = oklab;

    const C = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * 180) / Math.PI;

    // Ensure h is always between 0 and 360
    h = ((h % 360) + 360) % 360;

    // Handle the case where C is very close to zero
    if (C < 1e-6) {
        h = 0;
    }

    return { L, C, h };
}

/**
 * Converts Oklch color values to RGB.
 * @param {Oklch} oklch - An object with L, C, and h properties.
 * @returns {RGB} An object with r, g, and b properties.
 * @throws {Error} If the input is not a valid Oklch object.
 */
export function oklchToRgb(oklch: Oklch): RGB {
    if (typeof oklch !== 'object' || oklch === null) {
        throw new Error('Input must be an object');
    }

    const { L, C, h } = oklch;

    if (typeof L !== 'number' || typeof C !== 'number' || typeof h !== 'number') {
        throw new Error('Oklch values must be numbers');
    }

    // Convert L and C back to decimals
    const rawL = L / 100;
    const rawC = C / 100;

    // Normalize h to be between 0 and 360
    const normalizedH = ((h % 360) + 360) % 360;

    const hRadians = (normalizedH * Math.PI) / 180;
    const a = rawC * Math.cos(hRadians);
    const b = rawC * Math.sin(hRadians);

    const oklab: Oklab = { L: rawL, a, b };
    return oklabToRgb(oklab);
}