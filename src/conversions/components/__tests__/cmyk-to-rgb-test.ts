import { cmykToRgb } from '../cmyk-to-rgb';

describe('cmykToRgb', () => {
  it('should convert CMYK to RGB correctly', () => {
    expect(cmykToRgb({ c: 0, m: 100, y: 100, k: 0 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(cmykToRgb({ c: 100, m: 0, y: 100, k: 0 })).toEqual({ r: 0, g: 255, b: 0 });
    expect(cmykToRgb({ c: 100, m: 100, y: 0, k: 0 })).toEqual({ r: 0, g: 0, b: 255 });
    expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 100 })).toEqual({ r: 0, g: 0, b: 0 });
    expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 0 })).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('should handle decimal values', () => {
    expect(cmykToRgb({ c: 50, m: 30, y: 10, k: 20 })).toEqual({ r: 102, g: 143, b: 184 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => cmykToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => cmykToRgb({ c: '50', m: 30, y: 10, k: 20 } as any)).toThrow('CMYK values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => cmykToRgb({ c: 150, m: 30, y: 10, k: 20 })).toThrow('CMYK values must be between 0 and 100');
    expect(() => cmykToRgb({ c: 50, m: -10, y: 10, k: 20 })).toThrow('CMYK values must be between 0 and 100');
  });
});
