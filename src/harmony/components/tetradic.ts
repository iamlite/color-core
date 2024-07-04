import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a tetradic (rectangle) color harmony.
 * @param {Color} color - The base color.
 * @param {number} [angle=60] - The angle between color pairs (default: 60 degrees).
 * @returns {[Color, Color, Color, Color]} An array containing the base color and three tetradic colors.
 */
export function tetradic(color: Color, angle: number = 60): [Color, Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = {
        h: (hsl.h + angle) % 360,
        s: hsl.s,
        l: hsl.l
    };
    const color2: HSL = {
        h: (hsl.h + 180) % 360,
        s: hsl.s,
        l: hsl.l
    };
    const color3: HSL = {
        h: (hsl.h + 180 + angle) % 360,
        s: hsl.s,
        l: hsl.l
    };
    return [color, new Color(color1), new Color(color2), new Color(color3)];
}
