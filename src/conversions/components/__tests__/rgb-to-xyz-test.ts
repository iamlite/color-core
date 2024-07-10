import { rgbToXyz } from '../rgb-to-xyz';

describe('rgbToXyz', () => {
  it('should convert RGB to XYZ correctly', () => {
    expect(rgbToXyz({ r: 255, g: 0, b: 0 })).toEqual(expect.objectContaining({
      x: expect.closeTo(0.4124, 0.0001),
      y: expect.closeTo(0.2126, 0.0001),
      z: expect.closeTo(0.0193, 0.0001)
    }));
    expect(rgbToXyz({ r: 0, g: 255, b: 0 })).toEqual(expect.objectContaining({
      x: expect.closeTo(0.3576, 0.0001),
      y: expect.closeTo(0.7152, 0.0001),
      z: expect.closeTo(0.1192, 0.0001)
    }));
    expect(rgbToXyz({ r: 0, g: 0, b: 255 })).toEqual(expect.objectContaining({
      x: expect.closeTo(0.1805, 0.0001),
      y: expect.closeTo(0.0722, 0.0001),
      z: expect.closeTo(0.9505, 0.0001)
    }));
  });

  it('should handle black and white correctly', () => {
    expect(rgbToXyz({ r: 0, g: 0, b: 0 })).toEqual({ x: 0, y: 0, z: 0 });
    expect(rgbToXyz({ r: 255, g: 255, b: 255 })).toEqual(expect.objectContaining({
      x: expect.closeTo(0.9505, 0.0001),
      y: expect.closeTo(1.0000, 0.0001),
      z: expect.closeTo(1.0890, 0.0001)
    }));
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToXyz({ r: 128, g: 128, b: 128 })).toEqual(expect.objectContaining({
      x: expect.closeTo(0.2034, 0.0001),
      y: expect.closeTo(0.2140, 0.0001),
      z: expect.closeTo(0.2330, 0.0001)
    }));
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToXyz('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToXyz({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToXyz({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToXyz({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });
});
