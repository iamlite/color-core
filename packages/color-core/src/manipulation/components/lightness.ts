import { Color } from '../../color';
import { hslToRgb } from '../../conversions';

/**
 * Adjusts the lightness of a color.
 * @param color - The color to adjust.
 * @param amount - The amount to adjust by, from -100 to 100.
 * @returns A new Color instance with adjusted lightness.
 */
export function adjustLightness(color: Color, amount: number): Color {
    const hsl = color.toHsl();
    const newLightness = Math.max(0, Math.min(100, hsl.l + amount));
    const newRgb = hslToRgb({ ...hsl, l: newLightness });
    return new Color(newRgb);
}
