import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a complementary color harmony.
 * @param {Color} color - The base color.
 * @returns {[Color, Color]} An array containing the base color and its complement.
 */
export function complementary(color: Color): [Color, Color] {
    const hsl = color.toHsl();
    const complement: HSL = {
        h: (hsl.h + 180) % 360,
        s: hsl.s,
        l: hsl.l
    };
    return [color, new Color(complement)];
}
