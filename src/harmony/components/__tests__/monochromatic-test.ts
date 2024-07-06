import { Color } from '../../../color';
import { monochromatic } from '../monochromatic';

describe('monochromatic', () => {
  it('should return an array of colors', () => {
    const baseColor = new Color('#FF0000');
    const result = monochromatic(baseColor);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return colors with the same hue', () => {
    const baseColor = new Color('#FF0000');
    const result = monochromatic(baseColor);
    const baseHue = baseColor.toHsl().h;
    result.forEach(color => {
      expect(color.toHsl().h).toBe(baseHue);
    });
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    const blackColors = monochromatic(blackColor);
    const whiteColors = monochromatic(whiteColor);
    expect(blackColors[0].toHex()).toBe('#000000');
    expect(whiteColors[whiteColors.length - 1].toHex().toLowerCase()).toBe('#ffffff');
  });

});
