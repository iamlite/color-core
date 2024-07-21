import { Color } from '../../color';
import { RGB } from '../../types';

/**
 * Mixes two colors.
 * @param color1 - The first color.
 * @param color2 - The second color.
 * @param amount - The amount of the second color to mix in, from 0 to 1.
 * @returns A new Color instance representing the mixed color.
 */
export function mix(color1: Color, color2: Color, amount: number): Color {
    const rgb1 = color1.toRgb();
    const rgb2 = color2.toRgb();

    // Clamp amount to be between 0 and 1, or default to 0 if invalid
    const clampedAmount = isNaN(amount) ? 0 : Math.max(0, Math.min(1, amount));

    const mixValue = (a: number, b: number) => Math.round(a * (1 - clampedAmount) + b * clampedAmount);

    const mixedColor: RGB = {
        r: mixValue(rgb1.r, rgb2.r),
        g: mixValue(rgb1.g, rgb2.g),
        b: mixValue(rgb1.b, rgb2.b)
    };

    // Handle alpha mixing
    if (rgb1.a !== undefined || rgb2.a !== undefined) {
        const alpha1 = rgb1.a ?? 1;
        const alpha2 = rgb2.a ?? 1;
        mixedColor.a = alpha1 * (1 - clampedAmount) + alpha2 * clampedAmount;
    }

    return new Color(mixedColor);
}