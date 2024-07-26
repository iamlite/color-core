import { Color } from '../../color'

/**
 * Calculates the relative luminance of a color according to WCAG 2.0.
 *
 * Relative luminance represents the relative brightness of any point in a colorspace,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * @param color The color to analyze.
 * @returns A number between 0 (darkest black) and 1 (lightest white) representing the relative luminance.
 */
export function getRelativeLuminance(color: Color): number {
  const rgb = color.toRgb()
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(channel => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
