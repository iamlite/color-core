import { Color } from '../../../color';
import { tones } from '../tones';

describe('tones', () => {
  it('should return an array of colors', () => {
    const baseColor = new Color('#FF0000');
    const result = tones(baseColor);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return tones of the base color with varying saturation', () => {
    const baseColor = new Color('#FF0000');
    const result = tones(baseColor);
    const baseHue = baseColor.toHsl().h;
    result.forEach(color => {
      const { h, s } = color.toHsl();
      expect(h).toBe(baseHue);
      expect(s).toBeLessThanOrEqual(100);
      expect(s).toBeGreaterThanOrEqual(0);
    });
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(tones(blackColor)[0].toHex()).toBe('#000000');
    expect(tones(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
