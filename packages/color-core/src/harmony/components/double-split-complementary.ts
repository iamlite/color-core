import { Color } from '../../color';
import { HSL } from '../../types';

/**
 * Generates a double split-complementary color harmony.
 * @param {Color} color - The base color.
 * @returns {[Color, Color, Color, Color, Color]} An array containing the base color and four double split-complementary colors.
 */
export function doubleSplitComplementary(color: Color): [Color, Color, Color, Color, Color] {
    const hsl = color.toHsl(); // Ensure your Color class has a toHsl method to retrieve the HSL values
    const color1: HSL = { ...hsl, h: (hsl.h + 150) % 360 };
    const color2: HSL = { ...hsl, h: (hsl.h + 210) % 360 };
    const color3: HSL = { ...hsl, h: (hsl.h + 330) % 360 };
    const color4: HSL = { ...hsl, h: (hsl.h + 30) % 360 };

    return [
        color,
        new Color(color1),
        new Color(color2),
        new Color(color3),
        new Color(color4),
    ];
}
