import { rgbToLab } from '../rgb-to-lab';

describe('rgbToLab', () => {
  it('should convert RGB to LAB correctly', () => {
    expect(rgbToLab({ r: 255, g: 0, b: 0 })).toEqual(expect.objectContaining({
      l: expect.closeTo(53.23, 0.01),
      a: expect.closeTo(80.11, 0.01),
      b: expect.closeTo(67.22, 0.01)
    }));
    expect(rgbToLab({ r: 0, g: 255, b: 0 })).toEqual(expect.objectContaining({
      l: expect.closeTo(87.73, 0.01),
      a: expect.closeTo(-86.18, 0.01),
      b: expect.closeTo(83.18, 0.01)
    }));
    expect(rgbToLab({ r: 0, g: 0, b: 255 })).toEqual(expect.objectContaining({
      l: expect.closeTo(32.30, 0.01),
      a: expect.closeTo(79.20, 0.01),
      b: expect.closeTo(-107.86, 0.01)
    }));
  });

  it('should handle black and white correctly', () => {
    expect(rgbToLab({ r: 0, g: 0, b: 0 })).toEqual(expect.objectContaining({
      l: expect.closeTo(0, 0.01),
      a: expect.closeTo(0, 0.01),
      b: expect.closeTo(0, 0.01)
    }));
    expect(rgbToLab({ r: 255, g: 255, b: 255 })).toEqual(expect.objectContaining({
      l: expect.closeTo(100, 0.01),
      a: expect.closeTo(0, 0.01),
      b: expect.closeTo(0, 0.01)
    }));
  });

  it('should handle intermediate values correctly', () => {
    expect(rgbToLab({ r: 128, g: 128, b: 128 })).toEqual(expect.objectContaining({
      l: expect.closeTo(53.59, 0.01),
      a: expect.closeTo(0, 0.01),
      b: expect.closeTo(0, 0.01)
    }));
  });

  it('should throw an error for invalid input types', () => {
    expect(() => rgbToLab('not an object' as any)).toThrow('Input must be an object');
    expect(() => rgbToLab({ r: '255', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
  });

  it('should throw an error for out of range values', () => {
    expect(() => rgbToLab({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
    expect(() => rgbToLab({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
  });
});
