import { DivergingScale, DivergingScaleOptions } from '../../types'

/**
 * Creates a diverging color scale between three colors.
 *
 * A diverging color scale is a series of colors that transition from one color
 * to a middle color, then to a third color. This is useful for representing
 * continuous data that has a meaningful middle point or zero value.
 *
 * @param options - The options for creating the diverging scale.
 * @returns A DivergingScale (array of Color objects) representing the diverging scale.
 *
 * @example
 * const scale = createDivergingScale({
 *   startColor: new Color('#ff0000'),
 *   midColor: new Color('#ffffff'),
 *   endColor: new Color('#0000ff'),
 *   steps: 5
 * });
 * // Returns: [Color('#ff0000'), Color('#ff7f7f'), Color('#ffffff'), Color('#7f7fff'), Color('#0000ff')]
 *
 * @throws {Error} If steps is less than 3.
 */
export function createDivergingScale(options: DivergingScaleOptions): DivergingScale {
  const { startColor, midColor, endColor, steps } = options

  if (steps < 3) {
    throw new Error('Steps must be at least 3 to create a diverging scale')
  }

  const scale: DivergingScale = []
  const halfSteps = Math.floor(steps / 2)
  const hasMiddleStep = steps % 2 !== 0

  // First half of the scale (including middle if odd number of steps)
  for (let i = 0; i <= halfSteps; i++) {
    const t = i / halfSteps
    scale.push(startColor.mix(midColor, t))
  }

  // Remove duplicate middle color if even number of steps
  if (!hasMiddleStep) {
    scale.pop()
  }

  // Second half of the scale
  for (let i = 1; i <= halfSteps; i++) {
    const t = i / halfSteps
    scale.push(midColor.mix(endColor, t))
  }

  return scale
}
