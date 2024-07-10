import { Color } from '../../../color';
import { doubleSplitComplementary } from '../double-split-complementary';

describe('doubleSplitComplementary', () => {
  it('should return an array of five colors', () => {
    const baseColor = new Color('#FF0000');
    const result = doubleSplitComplementary(baseColor);
    expect(result).toHaveLength(5);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return the correct double split complementary colors', () => {
    const baseColor = new Color('#FF0000');
    const result = doubleSplitComplementary(baseColor);
    expect(result[0].toHex().toLowerCase()).toBe('#ff0000');
    expect(result[1].toHex().toLowerCase()).toBe('#00ff80');
    expect(result[2].toHex().toLowerCase()).toBe('#0080ff');
    expect(result[3].toHex().toLowerCase()).toBe('#ff0080');
    expect(result[4].toHex().toLowerCase()).toBe('#ff8000');
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(doubleSplitComplementary(blackColor)[0].toHex().toLowerCase()).toBe('#000000');
    expect(doubleSplitComplementary(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
