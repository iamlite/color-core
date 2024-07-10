import { rgbToYuv } from '../rgb-to-yuv';

describe('rgbToYuv', () => {
  it('should convert RGB to YUV correctly', () => {
    expect(rgbToYuv({ r: 255, g: 0, b: 0 })).toEqual(expect.objectContaining({
      y: expect.closeTo(0.299, 0.001),
      u: expect.closeTo(-0.14713, 0.001),
      v: expect.closeTo(0.615, 0.001)
    }));
    expect(rgbToYuv({ r: 0, g: 255, b: 0 })).toEqual(expect.objectContaining({
      y: expect.closeTo(0.587, 0.001),
      u: expect.closeTo(-0.28886, 0.001),
      v: expect.closeTo(-0.51499, 0.001)
    }));
    expect(rgbToYuv({ r: 0, g: 0, b: 255 })).toEqual(expect.objectContaining({
      y: expect.closeTo(0.114, 0.001),
      u: expect.closeTo(0.436, 0.001),
      v: expect.closeTo(-0.10001, 0.001)
    }));
  });

  it('should handle black and white correctly', () => {
    expect(rgbToYuv({ r: 0, g: 0, b: 0 })).toEqual({ y: 0, u: 0, v: 0 });
    expect(rgbToYuv({ r: 255, g: 255, b: 255 })).toEqual(expect.objectContaining({
      y: expect.closeTo(1, 0.001),
      u: expect.closeTo(0, 0.001),
      v: expect.closeTo(0, 0.001)
    }));
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToYuv({ r: 128, g: 128, b: 128 })).toEqual(expect.objectContaining({
      y: expect.closeTo(0.5, 0.001),
      u: expect.closeTo(0, 0.001),
      v: expect.closeTo(0, 0.001)
    }));
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToYuv('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToYuv({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToYuv({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToYuv({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });
});
