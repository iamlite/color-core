import { Color } from '../../color'

/**
 * Creates a multi-hue sequential color scale.
 *
 * This function generates a color scale that smoothly transitions through multiple colors.
 * It's useful for representing continuous data with multiple stages or phases.
 *
 * @param {Color[]} colorStops - An array of Color objects representing color stops in the scale.
 * @param {number} steps - The total number of colors to generate in the scale.
 * @returns {Color[]} An array of Color objects representing the multi-hue sequential scale.
 *
 * @example
 * const multiHueScale = createMultiHueSequentialScale([
 *   new Color('#ff0000'),  // Red
 *   new Color('#00ff00'),  // Green
 *   new Color('#0000ff')   // Blue
 * ], 10);
 * // Returns an array of 10 Color objects transitioning from red to green to blue
 */
export function createMultiHueSequentialScale(colorStops: Color[], steps: number): Color[] {
  if (colorStops.length < 2) {
    throw new Error('At least two color stops are required')
  }
  if (steps < 2) {
    throw new Error('Number of steps must be at least 2')
  }

  const scale: Color[] = []
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
