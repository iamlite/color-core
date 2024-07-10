import { rgbToCmyk } from '../rgb-to-cmyk';

describe('rgbToCmyk', () => {
  it('should convert RGB to CMYK correctly', () => {
    expect(rgbToCmyk({ r: 255, g: 0, b: 0 })).toEqual({ c: 0, m: 100, y: 100, k: 0 });
    expect(rgbToCmyk({ r: 0, g: 255, b: 0 })).toEqual({ c: 100, m: 0, y: 100, k: 0 });
    expect(rgbToCmyk({ r: 0, g: 0, b: 255 })).toEqual({ c: 100, m: 100, y: 0, k: 0 });
    expect(rgbToCmyk({ r: 0, g: 0, b: 0 })).toEqual({ c: 0, m: 0, y: 0, k: 100 });
    expect(rgbToCmyk({ r: 255, g: 255, b: 255 })).toEqual({ c: 0, m: 0, y: 0, k: 0 });
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToCmyk({ r: 128, g: 128, b: 128 })).toEqual({ c: 0, m: 0, y: 0, k: 50 });
    expect(rgbToCmyk({ r: 128, g: 0, b: 128 })).toEqual({ c: 0, m: 100, y: 0, k: 50 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToCmyk('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToCmyk({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToCmyk({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToCmyk({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });
});
