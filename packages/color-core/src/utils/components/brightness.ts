import { RGB } from '../../types';

/**
 * Calculates the perceived brightness of a color.
 * @param color The RGB color to calculate brightness for
 * @returns A value between 0 (darkest) and 255 (lightest)
 */
export function calculateBrightness(color: RGB): number {
    // Use Math.floor instead of Math.round to ensure consistent results
    return Math.floor((color.r * 299 + color.g * 587 + color.b * 114) / 1000);
}

/**
 * Determines if a color is perceived as "light" or "dark".
 * @param color The RGB color to check
 * @param threshold The brightness threshold (0-255). Default is 128.
 * @returns true if the color is light, false if it's dark
 */
export function isLightColor(color: RGB, threshold: number = 128): boolean {
    return calculateBrightness(color) >= threshold;
}