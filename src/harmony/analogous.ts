import { Color } from '../color';
import { HSL } from '../types';

/**
 * Generates an analogous color harmony.
 * @param {Color} color - The base color.
 * @param {number} [angle=30] - The angle between colors (default: 30 degrees).
 * @returns {[Color, Color, Color]} An array containing the base color and two analogous colors.
 */
export function analogous(color: Color, angle: number = 30): [Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = {
        h: (hsl.h + 360 - angle) % 360,
        s: hsl.s,
        l: hsl.l
    };
    const color2: HSL = {
        h: (hsl.h + angle) % 360,
        s: hsl.s,
        l: hsl.l
    };
    return [new Color(color1), color, new Color(color2)];
}
