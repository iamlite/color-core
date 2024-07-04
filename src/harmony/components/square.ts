import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a square color harmony.
 * @param {Color} color - The base color.
 * @returns {[Color, Color, Color, Color]} An array containing the base color and three square harmony colors.
 */
export function square(color: Color): [Color, Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = { ...hsl, h: (hsl.h + 90) % 360 };
    const color2: HSL = { ...hsl, h: (hsl.h + 180) % 360 };
    const color3: HSL = { ...hsl, h: (hsl.h + 270) % 360 };
    return [color, new Color(color1), new Color(color2), new Color(color3)];
}
