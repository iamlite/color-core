import { Color } from '../../../color';
import { tetradic } from '../tetradic';

describe('tetradic', () => {
  it('should return an array of four colors', () => {
    const baseColor = new Color('#FF0000');
    const result = tetradic(baseColor);
    expect(result).toHaveLength(4);
    result.forEach(color => expect(color).toBeInstanceOf(Color));
  });

  it('should return the correct tetradic colors', () => {
    const baseColor = new Color('#FF0000');
    const result = tetradic(baseColor);
    expect(result[0].toHex().toLowerCase()).toBe('#ff0000');
    expect(result[1].toHex().toLowerCase()).toBe('#80ff00');
    expect(result[2].toHex().toLowerCase()).toBe('#00ffff');
    expect(result[3].toHex().toLowerCase()).toBe('#8000ff');
  });

  it('should handle edge cases', () => {
    const blackColor = new Color('#000000');
    const whiteColor = new Color('#FFFFFF');
    expect(tetradic(blackColor)[0].toHex().toLowerCase()).toBe('#000000');
    expect(tetradic(whiteColor)[0].toHex().toLowerCase()).toBe('#ffffff');
  });
});
