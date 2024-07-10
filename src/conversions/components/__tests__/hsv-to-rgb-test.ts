import { hsvToRgb } from '../hsv-to-rgb';

describe('hsvToRgb', () => {
  it('should convert HSV to RGB correctly', () => {
    expect(hsvToRgb({ h: 0, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(hsvToRgb({ h: 120, s: 100, v: 100 })).toEqual({ r: 0, g: 255, b: 0 });
    expect(hsvToRgb({ h: 240, s: 100, v: 100 })).toEqual({ r: 0, g: 0, b: 255 });
    expect(hsvToRgb({ h: 0, s: 0, v: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    expect(hsvToRgb({ h: 0, s: 0, v: 100 })).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('should handle decimal values', () => {
    expect(hsvToRgb({ h: 180, s: 50, v: 75 })).toEqual({ r: 96, g: 191, b: 191 });
  });

  it('should handle edge cases', () => {
    expect(hsvToRgb({ h: 360, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(hsvToRgb({ h: 180, s: 0, v: 50 })).toEqual({ r: 128, g: 128, b: 128 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => hsvToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => hsvToRgb({ h: '180', s: 50, v: 75 } as any)).toThrow('HSV values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => hsvToRgb({ h: 361, s: 50, v: 75 })).toThrow('Invalid HSV values');
    expect(() => hsvToRgb({ h: 180, s: 101, v: 75 })).toThrow('Invalid HSV values');
    expect(() => hsvToRgb({ h: 180, s: 50, v: -1 })).toThrow('Invalid HSV values');
  });

  it('should throw an error if any HSV property is missing', () => {
    expect(() => hsvToRgb({ h: 180, s: 50 } as any)).toThrow('HSV values must be numbers');
    expect(() => hsvToRgb({ h: 180, v: 75 } as any)).toThrow('HSV values must be numbers');
    expect(() => hsvToRgb({ s: 50, v: 75 } as any)).toThrow('HSV values must be numbers');
  });

  it('should correctly convert based on h value affecting i % 6', () => {
    // Case 0: h = 0
    expect(hsvToRgb({ h: 0, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 0 });

    // Case 1: h = 61
    expect(hsvToRgb({ h: 61, s: 100, v: 100 })).toEqual({ r: 251, g: 255, b: 0 });

    // Case 2: h = 121
    expect(hsvToRgb({ h: 121, s: 100, v: 100 })).toEqual({ r: 0, g: 255, b: 4 });

    // Case 3: h = 181
    expect(hsvToRgb({ h: 181, s: 100, v: 100 })).toEqual({ r: 0, g: 251, b: 255 });

    // Case 4: h = 241
    expect(hsvToRgb({ h: 241, s: 100, v: 100 })).toEqual({ r: 4, g: 0, b: 255 });

    // Case 5: h = 301
    expect(hsvToRgb({ h: 301, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 251 });
  });


});
