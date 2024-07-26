import { Color } from '../../color'
import { getRelativeLuminance } from './relative-luminance'

/**
 * Calculates the contrast ratio between two colors according to WCAG 2.0.
 *
 * The contrast ratio is defined as (L1 + 0.05) / (L2 + 0.05), where
 * L1 is the relative luminance of the lighter of the two colors, and
 * L2 is the relative luminance of the darker of the two colors.
 *
 * @param color1 The first color.
 * @param color2 The second color.
 * @returns A number representing the contrast ratio. The ratio can range from 1 to 21.
 */
export function getContrastRatio(color1: Color, color2: Color): number {
  const luminance1 = getRelativeLuminance(color1)
  const luminance2 = getRelativeLuminance(color2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}
