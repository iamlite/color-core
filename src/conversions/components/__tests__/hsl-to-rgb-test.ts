import { hslToRgb } from '../hsl-to-rgb';

describe('hslToRgb', () => {
  it('should convert HSL to RGB correctly', () => {
    expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 });
    expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
    expect(hslToRgb({ h: 0, s: 0, l: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    expect(hslToRgb({ h: 0, s: 0, l: 100 })).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('should handle decimal values', () => {
    expect(hslToRgb({ h: 180, s: 50, l: 75 })).toEqual({ r: 159, g: 223, b: 223 });
  });

  it('should handle edge cases', () => {
    expect(hslToRgb({ h: 360, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(hslToRgb({ h: 180, s: 0, l: 50 })).toEqual({ r: 128, g: 128, b: 128 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => hslToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => hslToRgb({ h: '180', s: 50, l: 75 } as any)).toThrow('HSL values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => hslToRgb({ h: 361, s: 50, l: 75 })).toThrow('Invalid HSL values');
    expect(() => hslToRgb({ h: 180, s: 101, l: 75 })).toThrow('Invalid HSL values');
    expect(() => hslToRgb({ h: 180, s: 50, l: -1 })).toThrow('Invalid HSL values');
  });
});
