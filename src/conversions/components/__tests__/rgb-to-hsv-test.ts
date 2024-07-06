import { rgbToHsv } from '../rgb-to-hsv';

describe('rgbToHsv', () => {
  it('should convert RGB to HSV correctly', () => {
    expect(rgbToHsv({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, v: 100 });
    expect(rgbToHsv({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, v: 100 });
    expect(rgbToHsv({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, v: 100 });
    expect(rgbToHsv({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, v: 0 });
    expect(rgbToHsv({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, v: 100 });
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToHsv({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, v: 50 });
    expect(rgbToHsv({ r: 128, g: 0, b: 128 })).toEqual({ h: 300, s: 100, v: 50 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToHsv('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToHsv({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToHsv({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToHsv({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });
});
