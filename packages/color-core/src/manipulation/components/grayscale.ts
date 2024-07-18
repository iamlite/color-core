import { Color } from '../../color';

/**
 * Converts a color to grayscale.
 * @param color - The color to convert.
 * @returns A new Color instance in grayscale.
 */
export function grayscale(color: Color): Color {
    const { r, g, b, a } = color.toRgb();
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    return new Color({ r: gray, g: gray, b: gray, a });
}
