import { SequentialScale, SequentialScaleOptions } from '../../types'

/**
 * Creates a sequential color scale between two colors.
 *
 * A sequential color scale is a series of colors that transition smoothly
 * from one color to another. This is useful for representing continuous
 * data that ranges from low to high values.
 *
 * @param options - The options for creating the sequential scale.
 * @returns A SequentialScale (array of Color objects) representing the sequential scale.
 *
 * @example
 * const scale = createSequentialScale({
 *   startColor: new Color('#ff0000'),
 *   endColor: new Color('#0000ff'),
 *   steps: 5
 * });
 * // Returns: [Color('#ff0000'), Color('#bf003f'), Color('#7f007f'), Color('#3f00bf'), Color('#0000ff')]
 *
 * @throws {Error} If steps is less than 2.
 */
export function createSequentialScale(options: SequentialScaleOptions): SequentialScale {
  const { startColor, endColor, steps } = options

  if (steps < 2) {
    throw new Error('Steps must be at least 2 to create a scale')
  }

  const scale: SequentialScale = []
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    scale.push(startColor.mix(endColor, t))
  }

  return scale
}
