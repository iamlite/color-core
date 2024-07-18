import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a tints color harmony.
 * @param {Color} color - The base color.
 * @param {number} [count=5] - The number of tints to generate (default: 5).
 * @returns {Color[]} An array containing the base color and additional lighter tints.
 */
export function tints(color: Color, count: number = 5): Color[] {
    const hsl = color.toHsl();
    const step = (100 - hsl.l) / (count - 1);

    return Array.from({ length: count }, (_, i) => {
        const newColor: HSL = { ...hsl, l: Math.min(100, hsl.l + i * step) };
        return new Color(newColor);
    });
}
