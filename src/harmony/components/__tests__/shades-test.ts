import { Color } from '../../../color';
import { shades } from '../shades';

describe('shades', () => {
  it('should return an array of colors', () => {
    const baseColor = new Color('#FF0000');
    const result = shades(baseColor);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return darker shades of the base color', () => {
    const baseColor = new Color('#FF0000');
    const result = shades(baseColor);
    const baseLightness = baseColor.toHsl().l;
    result.forEach(color => {
      expect(color.toHsl().l).toBeLessThanOrEqual(baseLightness);
    });
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(shades(blackColor)[0].toHex().toLowerCase()).toBe('#000000');
    expect(shades(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
