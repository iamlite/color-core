import { createQualitativeScale } from '../qualitative-scale'
import { Color } from '../../../color'

describe('createQualitativeScale', () => {
  it('should create the correct number of colors', () => {
    const scale = createQualitativeScale(5)
    expect(scale).toHaveLength(5)

    const scale10 = createQualitativeScale(10)
    expect(scale10).toHaveLength(10)
  })

  it('should create distinct colors', () => {
    const scale = createQualitativeScale(10)
    const uniqueColors = new Set(scale.map(color => color.toHex()))
    expect(uniqueColors.size).toBe(10)
  })

  it('should throw an error for invalid input', () => {
    expect(() => createQualitativeScale(0)).toThrow('Number of colors must be at least 1')
    expect(() => createQualitativeScale(-1)).toThrow('Number of colors must be at least 1')
  })

  it('should return valid Color objects', () => {
    const scale = createQualitativeScale(3)
    scale.forEach(color => {
      expect(color).toBeInstanceOf(Color)
      expect(() => color.toRgb()).not.toThrow()
    })
  })
})
