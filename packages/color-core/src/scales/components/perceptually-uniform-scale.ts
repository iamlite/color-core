import { Color } from '../../color'
import { RGB, LAB } from '../../types'
import { rgbToLab, labToRgb } from '../../conversions'

/**
 * Creates a perceptually uniform sequential color scale.
 *
 * This function generates a color scale where the perceived difference between each step is uniform.
 * It's crucial for accurate representation of data in visualizations.
 *
 * @param {Color} startColor - The starting color of the scale.
 * @param {Color} endColor - The ending color of the scale.
 * @param {number} steps - The number of colors to generate in the scale.
 * @returns {Color[]} An array of Color objects representing the perceptually uniform sequential scale.
 *
 * @example
 * const uniformScale = createPerceptuallyUniformScale(
 *   new Color('#ffffcc'),  // Light yellow
 *   new Color('#800026'),  // Dark red
 *   7
 * );
 * // Returns an array of 7 Color objects with perceptually uniform steps between light yellow and dark red
 */
export function createPerceptuallyUniformScale(startColor: Color, endColor: Color, steps: number): Color[] {
  if (steps < 2) {
    throw new Error('Number of steps must be at least 2')
  }

  const startLab = rgbToLab(startColor.toRgb())
  const endLab = rgbToLab(endColor.toRgb())

  const scale: Color[] = []

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    const lab: LAB = {
      l: startLab.l + t * (endLab.l - startLab.l),
      a: startLab.a + t * (endLab.a - startLab.a),
      b: startLab.b + t * (endLab.b - startLab.b)
    }
    const rgb: RGB = labToRgb(lab)
    scale.push(new Color(rgb))
  }

  return scale
}
