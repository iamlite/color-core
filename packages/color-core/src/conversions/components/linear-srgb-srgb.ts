/**
 * Converts a linear sRGB color channel to sRGB.
 * @param {number} x - The linear sRGB color channel value (0-1).
 * @returns {number} The sRGB value (0-255).
 */
export function linearSrgbToSrgb(x: number): number {
    // Apply the linear to sRGB conversion
    const normalized = x <= 0.0031308
        ? x * 12.92
        : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    // Convert to 0-255 range and round
    return Math.round(Math.max(0, Math.min(255, normalized * 255)));
}

/**
 * Converts an sRGB color channel to linear sRGB.
 * @param {number} x - The sRGB color channel value (0-255).
 * @returns {number} The linear sRGB value (0-1).
 * @throws {Error} If the input value is out of range.
 */
export function srgbToLinearSrgb(x: number): number {
    if (x < 0 || x > 255) {
        throw new Error('sRGB value must be between 0 and 255');
    }
    // Normalize the input to 0-1 range
    const normalized = x / 255;
    // Apply the sRGB to linear conversion
    return normalized <= 0.04045
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
}