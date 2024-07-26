import { Color } from '../../../color'
import { getRelativeLuminance } from '../relative-luminance'

describe('getRelativeLuminance', () => {
  it('should return 0 for black', () => {
    const black = new Color('#000000')
    expect(getRelativeLuminance(black)).toBeCloseTo(0, 4)
  })

  it('should return 1 for white', () => {
    const white = new Color('#FFFFFF')
    expect(getRelativeLuminance(white)).toBeCloseTo(1, 4)
  })

  it('should return correct values for primary colors', () => {
    expect(getRelativeLuminance(new Color('#FF0000'))).toBeCloseTo(0.2126, 4) // Red
    expect(getRelativeLuminance(new Color('#00FF00'))).toBeCloseTo(0.7152, 4) // Green
    expect(getRelativeLuminance(new Color('#0000FF'))).toBeCloseTo(0.0722, 4) // Blue
  })

  it('should handle mid-range colors correctly', () => {
    expect(getRelativeLuminance(new Color('#808080'))).toBeCloseTo(0.2158, 3) // Medium gray
    expect(getRelativeLuminance(new Color('#A9A9A9'))).toBeCloseTo(0.3968, 3) // Dark gray
  })

  it('should handle various colors', () => {
    expect(getRelativeLuminance(new Color('#FFD700'))).toBeCloseTo(0.6986, 3) // Gold
    expect(getRelativeLuminance(new Color('#800080'))).toBeCloseTo(0.0615, 3) // Purple
    expect(getRelativeLuminance(new Color('#FFA500'))).toBeCloseTo(0.4817, 3) // Orange
    expect(getRelativeLuminance(new Color('#008080'))).toBeCloseTo(0.17, 3) // Teal
  })
})
