import { MultiHueSequentialScale, MultiHueSequentialScaleOptions } from '../../types'

/**
 * Creates a multi-hue sequential color scale.
 *
 * This function generates a color scale that smoothly transitions through multiple colors.
 * It's useful for representing continuous data with multiple stages or phases.
 *
 * @param options - The options for creating the multi-hue sequential scale.
 * @returns A MultiHueSequentialScale (array of Color objects) representing the multi-hue sequential scale.
 *
 * @example
 * const scale = createMultiHueSequentialScale({
 *   colorStops: [
 *     new Color('#ff0000'),  // Red
 *     new Color('#00ff00'),  // Green
 *     new Color('#0000ff')   // Blue
 *   ],
 *   steps: 10
 * });
 * // Returns an array of 10 Color objects transitioning from red to green to blue
 *
 * @throws {Error} If fewer than two color stops are provided or if steps is less than 2.
 */
export function createMultiHueSequentialScale(options: MultiHueSequentialScaleOptions): MultiHueSequentialScale {
  const { colorStops, steps } = options

  if (colorStops.length < 2) {
    throw new Error('At least two color stops are required')
  }
  if (steps < 2) {
    throw new Error('Number of steps must be at least 2')
  }

  const scale: MultiHueSequentialScale = []
  const segmentSize = (steps - 1) / (colorStops.length - 1)

  for (let i = 0; i < colorStops.length - 1; i++) {
    const start = colorStops[i]
    const end = colorStops[i + 1]
    const segmentSteps = i === colorStops.length - 2 ? Math.ceil(segmentSize) : Math.floor(segmentSize)

    for (let j = 0; j < segmentSteps; j++) {
      const t = j / segmentSteps
      scale.push(start.mix(end, t))
    }
  }

  // Add the last color stop if it's not already included
  if (scale.length < steps) {
    scale.push(colorStops[colorStops.length - 1])
  }

  return scale
}
