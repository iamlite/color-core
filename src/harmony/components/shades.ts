import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a shades color harmony.
 * @param {Color} color - The base color.
 * @param {number} [count=5] - The number of shades to generate (default: 5).
 * @returns {Color[]} An array containing the base color and additional darker shades.
 */
export function shades(color: Color, count: number = 5): Color[] {
    const hsl = color.toHsl();
    const step = hsl.l / (count - 1);

    return Array.from({ length: count }, (_, i) => {
        const newColor: HSL = { ...hsl, l: Math.max(0, hsl.l - i * step) };
        return new Color(newColor);
    });
}
