import { Color } from '../../../color'
import { createDivergingScale } from '../diverging-scale'

describe('createDivergingScale', () => {
  it('should create a scale with the correct number of steps', () => {
    const scale = createDivergingScale({
      startColor: new Color('#ff0000'),
      midColor: new Color('#ffffff'),
      endColor: new Color('#0000ff'),
      steps: 5
    })
    expect(scale.length).toBe(5)
  })

  it('should start, middle, and end with the given colors', () => {
    const scale = createDivergingScale({
      startColor: new Color('#ff0000'),
      midColor: new Color('#ffffff'),
      endColor: new Color('#0000ff'),
      steps: 5
    })
    expect(scale[0].toHex()).toBe('#ff0000')
    expect(scale[2].toHex()).toBe('#ffffff')
    expect(scale[4].toHex()).toBe('#0000ff')
  })

  it('should throw an error if steps is less than 3', () => {
    expect(() =>
      createDivergingScale({
        startColor: new Color('#ff0000'),
        midColor: new Color('#ffffff'),
        endColor: new Color('#0000ff'),
        steps: 2
      })
    ).toThrow('Steps must be at least 3 to create a diverging scale')
  })

  it('should create symmetrically distributed colors', () => {
    const scale = createDivergingScale({
      startColor: new Color('#ff0000'),
      midColor: new Color('#ffffff'),
      endColor: new Color('#0000ff'),
      steps: 5
    })
    expect(scale[1].toHex()).toBe('#ff8080')
    expect(scale[3].toHex()).toBe('#8080ff')
  })

  it('should handle even number of steps correctly', () => {
    const scale = createDivergingScale({
      startColor: new Color('#ff0000'),
      midColor: new Color('#ffffff'),
      endColor: new Color('#0000ff'),
      steps: 6
    })
    expect(scale.length).toBe(6)
    expect(scale[2].toHex()).toBe('#ffaaaa')
    expect(scale[3].toHex()).toBe('#aaaaff')
  })
})
