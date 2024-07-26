import { Color } from '../../../color'
import { createMultiHueSequentialScale } from '../multi-hue-sequential-scale'

describe('createMultiHueSequentialScale', () => {
  it('should create the correct number of colors', () => {
    const colorStops = [new Color('#ff0000'), new Color('#00ff00'), new Color('#0000ff')]
    const scale = createMultiHueSequentialScale({ colorStops, steps: 10 })
    expect(scale).toHaveLength(10)
  })

  it('should start and end with the given colors', () => {
    const colorStops = [new Color('#ff0000'), new Color('#00ff00'), new Color('#0000ff')]
    const scale = createMultiHueSequentialScale({ colorStops, steps: 5 })
    expect(scale[0].toHex()).toBe('#ff0000')
    expect(scale[4].toHex()).toBe('#0000ff')
  })

  it('should throw an error for invalid stop inputs', () => {
    const colorStops = [new Color('#ff0000')]
    expect(() => createMultiHueSequentialScale({ colorStops, steps: 1 })).toThrow(
      'At least two color stops are required'
    )
  })

  it('should throw an error for invalid step inputs', () => {
    const colorStops = [new Color('#ff0000'), new Color('#00ff00'), new Color('#0000ff')]
    expect(() => createMultiHueSequentialScale({ colorStops, steps: 1 })).toThrow('Number of steps must be at least 2')
  })

  it('should create a smooth transition between colors', () => {
    const colorStops = [new Color('#ff0000'), new Color('#0000ff')]
    const scale = createMultiHueSequentialScale({ colorStops, steps: 5 })
    expect(scale[1].toHex()).toBe('#bf0040')
    expect(scale[2].toHex()).toBe('#800080')
    expect(scale[3].toHex()).toBe('#4000bf')
  })
})
