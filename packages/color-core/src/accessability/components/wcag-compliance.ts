import { Color } from '../../color'
import { TextSize, WCAGComplianceLevel } from '../../types'
import { getContrastRatio } from './contrast-ratio'

/**
 * Determines the WCAG compliance level for the contrast between two colors.
 *
 * @param color1 The first color.
 * @param color2 The second color.
 * @param size The size of the text ('Normal' or 'Large').
 * @returns An object containing the compliance level and the contrast ratio.
 */
export function getWCAGCompliance(
  color1: Color,
  color2: Color,
  size: TextSize
): { level: WCAGComplianceLevel; contrastRatio: number } {
  const contrastRatio = getContrastRatio(color1, color2)
  let level: WCAGComplianceLevel

  if (size === 'Normal') {
    if (contrastRatio >= 7) {
      level = 'AAA'
    } else if (contrastRatio >= 4.5) {
      level = 'AA'
    } else if (contrastRatio >= 3) {
      level = 'A'
    } else if (contrastRatio >= 2) {
      level = 'Fail'
    } else {
      level = 'Poor'
    }
  } else {
    // Large text
    if (contrastRatio >= 4.5) {
      level = 'AAA'
    } else if (contrastRatio >= 3) {
      level = 'AA'
    } else if (contrastRatio >= 2) {
      level = 'A'
    } else if (contrastRatio >= 1.5) {
      level = 'Fail'
    } else {
      level = 'Poor'
    }
  }

  return { level, contrastRatio }
}
