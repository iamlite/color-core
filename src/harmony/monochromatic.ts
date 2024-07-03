import { Color } from '../color';
import { HSL } from '../types';

/**
 * Generates a monochromatic color harmony.
 * @param {Color} color - The base color.
 * @param {number} [count=5] - The number of colors to generate (default: 5).
 * @returns {Color[]} An array containing the base color and additional monochromatic colors.
 */
export function monochromatic(color: Color, count: number = 5): Color[] {
    const hsl = color.toHsl();
    const step = 100 / (count - 1);
    
    return Array.from({ length: count }, (_, i) => {
        const newColor: HSL = {
            h: hsl.h,
            s: hsl.s,
            l: Math.min(100, Math.max(0, i * step))
        };
        return new Color(newColor);
    });
}
