import { Color } from '../../../color';
import { tints } from '../tints';

describe('tints', () => {
  it('should return an array of colors', () => {
    const baseColor = new Color('#FF0000');
    const result = tints(baseColor);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return lighter tints of the base color', () => {
    const baseColor = new Color('#FF0000');
    const result = tints(baseColor);
    const baseLightness = baseColor.toHsl().l;
    result.forEach(color => {
      expect(color.toHsl().l).toBeGreaterThanOrEqual(baseLightness);
    });
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(tints(blackColor)[0].toHex()).toBe('#000000');
    expect(tints(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
