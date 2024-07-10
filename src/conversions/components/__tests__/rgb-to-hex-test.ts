import { rgbToHex } from '../rgb-to-hex';

describe('rgbToHex', () => {
  it('should convert RGB to hex correctly', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
    expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
    expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToHex({ r: 128, g: 128, b: 128 })).toBe('#808080');
    expect(rgbToHex({ r: 15, g: 15, b: 15 })).toBe('#0f0f0f');
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToHex('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToHex({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToHex({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToHex({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });

  it('should convert RGB to hex without alpha', () => {
    expect(rgbToHex({ r: 255, g: 128, b: 0 })).toBe('#ff8000');
  });

  it('should convert RGB to hex with alpha when specified', () => {
    expect(rgbToHex({ r: 255, g: 128, b: 0, a: 0.5 }, true)).toBe('#ff800080');
  });

  it('should handle undefined alpha when including alpha', () => {
    expect(rgbToHex({ r: 255, g: 128, b: 0 }, true)).toBe('#ff8000');
  });

  it('should pad single-digit hex values', () => {
    expect(rgbToHex({ r: 0, g: 10, b: 15, a: 0.05 }, true)).toBe('#000a0f0d');
  });

  it('should throw an error for invalid RGB values', () => {
    expect(() => rgbToHex({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });

  it('should throw an error for invalid alpha value', () => {
    expect(() => rgbToHex({ r: 255, g: 0, b: 0, a: 1.1 }, true)).toThrow('Alpha value must be a number between 0 and 1');
  });

  it('should handle very low alpha values', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0, a: 0.004 }, true)).toBe('#ff000001');
    expect(rgbToHex({ r: 255, g: 0, b: 0, a: 0.001 }, true)).toBe('#ff000001');
  });

  it('should handle very high alpha values', () => {
    expect(rgbToHex({ r: 0, g: 255, b: 0, a: 0.996 }, true)).toBe('#00ff00fe');
    expect(rgbToHex({ r: 0, g: 255, b: 0, a: 0.999 }, true)).toBe('#00ff00fe');
  });

  it('should handle normal alpha values', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 255, a: 0.5 }, true)).toBe('#0000ff80');
  });
});