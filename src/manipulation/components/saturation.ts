import { Color } from '../../color';
import { hslToRgb } from '../../conversions';

/**
 * Adjusts the saturation of a color.
 * @param color - The color to adjust.
 * @param amount - The amount to adjust by, from -100 to 100.
 * @returns A new Color instance with adjusted saturation.
 */
export function adjustSaturation(color: Color, amount: number): Color {
    const hsl = color.toHsl();
    const newSaturation = Math.max(0, Math.min(100, hsl.s + amount));
    const newRgb = hslToRgb({ ...hsl, s: newSaturation });
    return new Color(newRgb);
}
