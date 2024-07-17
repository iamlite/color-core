import { Color } from '../../../color';
import { square } from '../square';

describe('square', () => {
  it('should return an array of four colors', () => {
    const baseColor = new Color('#FF0000');
    const result = square(baseColor);
    expect(result).toHaveLength(4);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return the correct square colors', () => {
    const baseColor = new Color('#FF0000');
    const result = square(baseColor);
    expect(result[0].toHex().toLowerCase()).toBe('#ff0000');
    expect(result[1].toHex().toLowerCase()).toBe('#80ff00');
    expect(result[2].toHex().toLowerCase()).toBe('#00ffff');
    expect(result[3].toHex().toLowerCase()).toBe('#8000ff');
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(square(blackColor)[0].toHex().toLowerCase()).toBe('#000000');
    expect(square(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
