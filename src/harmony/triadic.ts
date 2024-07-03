import { Color } from '../color';
import { HSL } from '../types';

/**
 * Generates a triadic color harmony.
 * @param {Color} color - The base color.
 * @returns {[Color, Color, Color]} An array containing the base color and two triadic colors.
 */
export function triadic(color: Color): [Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = {
        h: (hsl.h + 120) % 360,
        s: hsl.s,
        l: hsl.l
    };
    const color2: HSL = {
        h: (hsl.h + 240) % 360,
        s: hsl.s,
        l: hsl.l
    };
    return [color, new Color(color1), new Color(color2)];
}
