import { yuvToRgb } from '../yuv-to-rgb';

describe('yuvToRgb', () => {
  it('should convert YUV to RGB correctly for standard colors', () => {
    expect(yuvToRgb({ y: 0.299, u: -0.147, v: 0.615 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(yuvToRgb({ y: 0.587, u: -0.289, v: -0.515 })).toEqual({ r: 0, g: 255, b: 0 });
    expect(yuvToRgb({ y: 0.114, u: 0.436, v: -0.100 })).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('should handle black and white correctly', () => {
    expect(yuvToRgb({ y: 0, u: 0, v: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    expect(yuvToRgb({ y: 1, u: 0, v: 0 })).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('should handle intermediate values correctly', () => {
    const result = yuvToRgb({ y: 0.5, u: 0, v: 0 });
    expect(result.r).toBeCloseTo(128, -1);
    expect(result.g).toBeCloseTo(128, -1);
    expect(result.b).toBeCloseTo(128, -1);
  });

  it('should clamp RGB values to 0-255 range and YUV values to valid ranges', () => {
    const extremeResult = yuvToRgb({ y: 2, u: 2, v: 2 });
    expect(extremeResult.r).toBe(255);
    expect(extremeResult.g).toBeGreaterThanOrEqual(0);
    expect(extremeResult.g).toBeLessThanOrEqual(255);
    expect(extremeResult.b).toBe(255);

    expect(yuvToRgb({ y: -1, u: -1, v: -1 })).toEqual({ r: 0, g: 0, b: 0 });

    const maxResult = yuvToRgb({ y: 1, u: 0.436, v: 0.615 });
    expect(maxResult.r).toBe(255);
    expect(maxResult.g).toBeGreaterThanOrEqual(0);
    expect(maxResult.g).toBeLessThanOrEqual(255);
    expect(maxResult.b).toBe(255);

    // Specific test for minimum YUV values
    expect(yuvToRgb({ y: 0, u: -0.436, v: -0.615 })).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => yuvToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => yuvToRgb({ y: '0.299', u: -0.147, v: 0.615 } as any)).toThrow('YUV values must be numbers');
  });
});