import { Color } from '../../color';

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
    const mixValue = (a: number, b: number) => Math.round(a * (1 - amount) + b * amount);
    return new Color({
        r: mixValue(rgb1.r, rgb2.r),
        g: mixValue(rgb1.g, rgb2.g),
        b: mixValue(rgb1.b, rgb2.b),
        a: mixValue(rgb1.a || 1, rgb2.a || 1)
    });
}
