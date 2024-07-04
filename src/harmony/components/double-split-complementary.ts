import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a double split-complementary color harmony.
 * @param {Color} color - The base color.
 * @param {number} [angle=30] - The angle of split (default: 30 degrees).
 * @returns {[Color, Color, Color, Color]} An array containing the base color and three double split-complementary colors.
 */
export function doubleSplitComplementary(color: Color, angle: number = 30): [Color, Color, Color, Color] {
    const hsl = color.toHsl();
    const color1: HSL = { ...hsl, h: (hsl.h + 180 - angle) % 360 };
    const color2: HSL = { ...hsl, h: (hsl.h + 180) % 360 };
    const color3: HSL = { ...hsl, h: (hsl.h + 180 + angle) % 360 };
    return [color, new Color(color1), new Color(color2), new Color(color3)];
}
