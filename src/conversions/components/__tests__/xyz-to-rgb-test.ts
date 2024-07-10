import { xyzToRgb } from '../xyz-to-rgb';

describe('xyzToRgb', () => {
  it('should convert XYZ to RGB correctly', () => {
    expect(xyzToRgb({ x: 0.4124, y: 0.2126, z: 0.0193 })).toEqual(expect.objectContaining({
      r: expect.closeTo(255, 1),
      g: expect.closeTo(0, 1),
      b: expect.closeTo(0, 1)
    }));
    expect(xyzToRgb({ x: 0.3576, y: 0.7152, z: 0.1192 })).toEqual(expect.objectContaining({
      r: expect.closeTo(0, 1),
      g: expect.closeTo(255, 1),
      b: expect.closeTo(0, 1)
    }));
    expect(xyzToRgb({ x: 0.1805, y: 0.0722, z: 0.9505 })).toEqual(expect.objectContaining({
      r: expect.closeTo(0, 1),
      g: expect.closeTo(0, 1),
      b: expect.closeTo(255, 1)
    }));
  });

  it('should handle black and white correctly', () => {
    expect(xyzToRgb({ x: 0, y: 0, z: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    expect(xyzToRgb({ x: 0.9505, y: 1.0000, z: 1.0890 })).toEqual(expect.objectContaining({
      r: expect.closeTo(255, 1),
      g: expect.closeTo(255, 1),
      b: expect.closeTo(255, 1)
    }));
  });

  it('should handle intermediate values correctly', () => {
    const result = xyzToRgb({ x: 0.2034, y: 0.2140, z: 0.2330 });
    expect(result.r).toBeGreaterThanOrEqual(126);
    expect(result.r).toBeLessThanOrEqual(128);
    expect(result.g).toBeGreaterThanOrEqual(126);
    expect(result.g).toBeLessThanOrEqual(128);
    expect(result.b).toBeGreaterThanOrEqual(126);
    expect(result.b).toBeLessThanOrEqual(128);
  });


  it('should clamp RGB values to 0-255 range', () => {
    expect(xyzToRgb({ x: 2, y: 2, z: 2 })).toEqual({ r: 255, g: 255, b: 255 });
    expect(xyzToRgb({ x: -1, y: -1, z: -1 })).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => xyzToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => xyzToRgb({ x: '0.4124', y: 0.2126, z: 0.0193 } as any)).toThrow('XYZ values must be numbers');
  });
});
