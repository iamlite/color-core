import { Color } from '../../color';
import { hslToRgb } from '../../conversions';

/**
 * Adjusts the hue of a color.
 * @param color - The color to adjust.
 * @param amount - The amount to adjust by, in degrees.
 * @returns A new Color instance with adjusted hue.
 */
export function adjustHue(color: Color, amount: number): Color {
    const hsl = color.toHsl();
    const newHue = (hsl.h + amount + 360) % 360;
    const newRgb = hslToRgb({ ...hsl, h: newHue });
    return new Color(newRgb);
}
