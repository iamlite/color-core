import { Color } from '../../../color';
import { analogous } from '../analogous';

describe('analogous', () => {
  it('should return an array of three colors', () => {
    const baseColor = new Color('#FF0000');
    const result = analogous(baseColor);
    expect(result).toHaveLength(3);
    expect(result[0]).toBeInstanceOf(Color);
    expect(result[1]).toBeInstanceOf(Color);
    expect(result[2]).toBeInstanceOf(Color);
  });

  it('should return the correct analogous colors', () => {
    const baseColor = new Color('#FF0000');
    const result = analogous(baseColor);
    expect(result[0].toHex().toLowerCase()).toBe('#ff0080');
    expect(result[1].toHex().toLowerCase()).toBe('#ff0000');
    expect(result[2].toHex().toLowerCase()).toBe('#ff8000');
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(analogous(blackColor)[1].toHex().toLowerCase()).toBe('#000000');
    expect(analogous(whiteColor)[1].toHex().toLowerCase()).toBe('#ffffff');
  });
});
