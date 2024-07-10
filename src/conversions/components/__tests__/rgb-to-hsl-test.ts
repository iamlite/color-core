import { rgbToHsl } from '../rgb-to-hsl';

describe('rgbToHsl', () => {
  it('should convert RGB to HSL correctly', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 });
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, l: 50 });
    expect(rgbToHsl({ r: 128, g: 0, b: 128 })).toEqual({ h: 300, s: 100, l: 25 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToHsl('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToHsl({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToHsl({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToHsl({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });
});
