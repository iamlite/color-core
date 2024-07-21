import { Color } from '../../color'
import { RGB } from '../../types'
import { hslToRgb } from '../../conversions'

/**
 * Creates a qualitative color scale.
 *
 * This function generates a set of distinct colors that are easily distinguishable from each other,
 * which is useful for representing categorical data.
 *
 * @param {number} numberOfColors - The number of distinct colors to generate.
 * @returns {Color[]} An array of distinct Color objects.
 *
 * @example
 * const categoricalColors = createQualitativeScale(5);
 * // Returns an array of 5 distinct Color objects
 */
export function createQualitativeScale(numberOfColors: number): Color[] {
  if (numberOfColors < 1) {
    throw new Error('Number of colors must be at least 1')
  }

  const goldenRatioConjugate = 0.618033988749895
  const scale: Color[] = []

  for (let i = 0; i < numberOfColors; i++) {
    const hue = (i * goldenRatioConjugate) % 1
    const saturation = 0.5 + Math.random() * 0.3 // 0.5 to 0.8
    const lightness = 0.4 + Math.random() * 0.2 // 0.4 to 0.6

    const rgb: RGB = hslToRgb({ h: hue * 360, s: saturation * 100, l: lightness * 100 })
    scale.push(new Color(rgb))
  }

  return scale
}
