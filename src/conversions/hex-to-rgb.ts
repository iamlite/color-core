import { RGB } from '../types';

/**
 * Converts a hex color code to RGB values.
 * @param {string} hex - The hex color code.
 * @returns {RGB} An object with r, g, and b properties.
 * @throws {Error} If the input is not a valid hex color code.
 */
export function hexToRgb(hex: string): RGB {
    if (typeof hex !== 'string') {
        throw new Error('Input must be a string');
    }

    const trimmedHex = hex.replace('#', '').trim();

    if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(trimmedHex)) {
        throw new Error('Invalid hex color format');
    }

    const expandedHex = trimmedHex.length === 3
        ? trimmedHex.split('').map(char => char + char).join('')
        : trimmedHex;

    const r = parseInt(expandedHex.slice(0, 2), 16);
    const g = parseInt(expandedHex.slice(2, 4), 16);
    const b = parseInt(expandedHex.slice(4, 6), 16);

    return { r, g, b };
}