import { Color } from '../../../color'
import { getWCAGCompliance } from '../wcag-compliance'

describe('getWCAGCompliance', () => {
  const black = new Color('#000000')
  const white = new Color('#FFFFFF')

  it('should return AAA for black and white text', () => {
    const result = getWCAGCompliance(black, white, 'Normal')
    expect(result.level).toBe('AAA')
    expect(result.contrastRatio).toBeCloseTo(21, 2)
  })

  it('should return AA for sufficient contrast with normal text', () => {
    const darkSlateGray = new Color('#2F4F4F')
    const lightGray = new Color('#D3D3D3')
    const result = getWCAGCompliance(darkSlateGray, lightGray, 'Normal')
    expect(result.level).toBe('AA')
    expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5)
    expect(result.contrastRatio).toBeLessThan(7)
  })

  it('should return A for minimum contrast with large text', () => {
    const olive = new Color('#808000')
    const tan = new Color('#D2B48C')
    const result = getWCAGCompliance(olive, tan, 'Large')
    expect(result.level).toBe('A')
    expect(result.contrastRatio).toBeGreaterThanOrEqual(2)
    expect(result.contrastRatio).toBeLessThan(3)
  })

  it('should return Fail for low contrast with normal text', () => {
    const mediumAquamarine = new Color('#66CDAA')
    const lightCyan = new Color('#E0FFFF')
    const result = getWCAGCompliance(mediumAquamarine, lightCyan, 'Normal')
    expect(result.level).toBe('Poor')
    expect(result.contrastRatio).toBeGreaterThanOrEqual(1.82)
    expect(result.contrastRatio).toBeLessThan(1.84)
  })

  it('should return Poor for very low contrast', () => {
    const lightSkyBlue = new Color('#87CEFA')
    const paleTurquoise = new Color('#AFEEEE')
    const result = getWCAGCompliance(lightSkyBlue, paleTurquoise, 'Normal')
    expect(result.level).toBe('Poor')
    expect(result.contrastRatio).toBeLessThan(2)
  })

  it('should handle large text differently', () => {
    const mediumSeaGreen = new Color('#3CB371')
    const mintCream = new Color('#F5FFFA')
    const normalResult = getWCAGCompliance(mediumSeaGreen, mintCream, 'Normal')
    const largeResult = getWCAGCompliance(mediumSeaGreen, mintCream, 'Large')
    expect(normalResult.level).not.toBe(largeResult.level)
  })
})
