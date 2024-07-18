import { Color } from '../../../color';
import { complementary } from '../complementary';

describe('complementary', () => {
  it('should return an array of two colors', () => {
    const baseColor = new Color('#FF0000');
    const result = complementary(baseColor);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Color);
    expect(result[1]).toBeInstanceOf(Color);
  });

  it('should return the correct complementary color', () => {
    const baseColor = new Color('#FF0000');
    const result = complementary(baseColor);
    expect(result[0].toHex().toLowerCase()).toBe('#ff0000');
    expect(result[1].toHex().toLowerCase()).toBe('#00ffff');
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(complementary(blackColor)[1].toHex().toLowerCase()).toBe('#000000');
    expect(complementary(whiteColor)[1].toHex().toLowerCase()).toBe('#ffffff');
  });
});
