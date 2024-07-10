import { Color } from '../../color';

/**
 * Inverts a color.
 * @param color - The color to invert.
 * @returns A new Color instance with inverted RGB values.
 */
export function invert(color: Color): Color {
    const { r, g, b, a } = color.toRgb();
    return new Color({ r: 255 - r, g: 255 - g, b: 255 - b, a });
}
