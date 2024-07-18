import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a split-complementary color harmony.
 * @param {Color} color - The base color.
 * @param {number} [angle=30] - The angle of split (default: 30 degrees).
 * @returns {[Color, Color, Color]} An array containing the base color and two split-complementary colors.
 */
export function splitComplementary(color: Color, angle: number = 30): [Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = {
        h: (hsl.h + 180 - angle) % 360,
        s: hsl.s,
        l: hsl.l
    };
    const color2: HSL = {
        h: (hsl.h + 180 + angle) % 360,
        s: hsl.s,
        l: hsl.l
    };
    return [color, new Color(color1), new Color(color2)];
}
