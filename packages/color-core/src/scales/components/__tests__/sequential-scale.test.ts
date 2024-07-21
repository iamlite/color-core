import { Color } from '../../../color'
import { createSequentialScale } from '../sequential-scale'

describe('createSequentialScale', () => {
  it('should create a scale with the correct number of steps', () => {
    const scale = createSequentialScale({
      startColor: new Color('#ff0000'),
      endColor: new Color('#0000ff'),
      steps: 5
    })
    expect(scale.length).toBe(5)
  })

  it('should start and end with the given colors', () => {
    const scale = createSequentialScale({
      startColor: new Color('#ff0000'),
      endColor: new Color('#0000ff'),
      steps: 5
    })
    expect(scale[0].toHex()).toBe('#ff0000')
    expect(scale[4].toHex()).toBe('#0000ff')
  })

  it('should throw an error if steps is less than 2', () => {
    expect(() =>
      createSequentialScale({
        startColor: new Color('#ff0000'),
        endColor: new Color('#0000ff'),
        steps: 1
      })
    ).toThrow('Steps must be at least 2 to create a scale')
  })

  it('should create evenly distributed colors', () => {
    const scale = createSequentialScale({
      startColor: new Color('#000000'),
      endColor: new Color('#ffffff'),
      steps: 5
    })
    expect(scale[1].toHex()).toBe('#404040')
    expect(scale[2].toHex()).toBe('#808080')
    expect(scale[3].toHex()).toBe('#bfbfbf')
  })
})
