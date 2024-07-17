import { Color } from '../../../color';
import { splitComplementary } from '../split-complementary';

describe('splitComplementary', () => {
  it('should return an array of three colors', () => {
    const baseColor = new Color('#FF0000');
    const result = splitComplementary(baseColor);
    expect(result).toHaveLength(3);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return the correct split complementary colors', () => {
    const baseColor = new Color('#FF0000');
    const result = splitComplementary(baseColor);
    expect(result[0].toHex().toLowerCase()).toBe('#ff0000');
    expect(result[1].toHex().toLowerCase()).toBe('#00ff80');
    expect(result[2].toHex().toLowerCase()).toBe('#0080ff');
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(splitComplementary(blackColor)[0].toHex().toLowerCase()).toBe('#000000');
    expect(splitComplementary(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
