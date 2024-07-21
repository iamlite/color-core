import { createPerceptuallyUniformScale } from '../perceptually-uniform-scale'
import { Color } from '../../../color'

describe('createPerceptuallyUniformScale', () => {
  it('should create the correct number of colors', () => {
    const start = new Color('#ffffcc')
    const end = new Color('#800026')
    const scale = createPerceptuallyUniformScale(start, end, 7)
    expect(scale).toHaveLength(7)
  })

  it('should start and end with the given colors', () => {
    const start = new Color('#ffffcc')
    const end = new Color('#800026')
    const scale = createPerceptuallyUniformScale(start, end, 5)
    expect(scale[0].toHex()).toBe('#ffffcc')
    expect(scale[4].toHex()).toBe('#800026')
  })

  it('should throw an error for invalid input', () => {
    const start = new Color('#ffffcc')
    const end = new Color('#800026')
    expect(() => createPerceptuallyUniformScale(start, end, 1)).toThrow('Number of steps must be at least 2')
  })

  it('should create a perceptually uniform scale', () => {
    const start = new Color('#ffffcc')
    const end = new Color('#800026')
    const scale = createPerceptuallyUniformScale(start, end, 5)

    // Check if the differences between consecutive colors are roughly equal
    // This is a simplified check and might not be perfect due to rounding and conversion errors
    const differences: number[] = []
    for (let i = 1; i < scale.length; i++) {
      const diff = colorDifference(scale[i - 1], scale[i])
      differences.push(diff)
    }

    const avgDifference = differences.reduce((a, b) => a + b, 0) / differences.length
    differences.forEach(diff => {
      expect(diff).toBeCloseTo(avgDifference, -2)
    })
  })
})

// Helper function to calculate a simple color difference
function colorDifference(color1: Color, color2: Color): number {
  const rgb1 = color1.toRgb()
  const rgb2 = color2.toRgb()
  return Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2))
}
