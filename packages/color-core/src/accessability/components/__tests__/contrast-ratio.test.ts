import { Color } from '../../../color'
import { getContrastRatio } from '../contrast-ratio'

describe('getContrastRatio', () => {
  it('should return 1 for identical colors', () => {
    const color = new Color('#555555')
    expect(getContrastRatio(color, color)).toBeCloseTo(1, 2)
  })

  it('should return 21 for black and white', () => {
    const black = new Color('#000000')
    const white = new Color('#FFFFFF')
    expect(getContrastRatio(black, white)).toBeCloseTo(21, 2)
  })

  it('should be commutative', () => {
    const color1 = new Color('#FF5733')
    const color2 = new Color('#33FF57')
    const ratio1 = getContrastRatio(color1, color2)
    const ratio2 = getContrastRatio(color2, color1)
    expect(ratio1).toBeCloseTo(ratio2, 4)
  })

  it('should calculate correct ratios for various color pairs', () => {
    const darkBlue = new Color('#00008B')
    const lightGray = new Color('#D3D3D3')
    expect(getContrastRatio(darkBlue, lightGray)).toBeCloseTo(10.22, 2)

    const olive = new Color('#808000')
    const ivory = new Color('#FFFFF0')
    expect(getContrastRatio(olive, ivory)).toBeCloseTo(4.1583, 2)

    const darkRed = new Color('#8B0000')
    const lightPink = new Color('#FFB6C1')
    expect(getContrastRatio(darkRed, lightPink)).toBeCloseTo(6.0603, 2)
  })

  it('should handle edge cases', () => {
    const almostBlack = new Color('#010101')
    const almostWhite = new Color('#FEFEFE')
    expect(getContrastRatio(almostBlack, almostWhite)).toBeCloseTo(20.6964, 2)

    const barelyDifferent1 = new Color('#EEEEEE')
    const barelyDifferent2 = new Color('#EDEDED')
    expect(getContrastRatio(barelyDifferent1, barelyDifferent2)).toBeCloseTo(1.01, 2)
  })
})
