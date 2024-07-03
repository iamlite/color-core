import { Color } from '../color';
import { HSL } from '../types';

/**
 * Generates a compound (accented analog) color harmony.
 * @param {Color} color - The base color.
 * @param {number} [angle=30] - The angle between analogous colors (default: 30 degrees).
 * @returns {[Color, Color, Color, Color]} An array containing the base color, two analogous colors, and the complement of the middle color.
 */
export function compound(color: Color, angle: number = 30): [Color, Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = { ...hsl, h: (hsl.h - angle + 360) % 360 };
    const color2: HSL = { ...hsl, h: (hsl.h + angle) % 360 };
    const color3: HSL = { ...hsl, h: (hsl.h + 180) % 360 };
    return [new Color(color1), color, new Color(color2), new Color(color3)];
}
