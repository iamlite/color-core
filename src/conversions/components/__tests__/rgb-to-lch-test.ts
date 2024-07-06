import { rgbToLch } from '../rgb-to-lch';
import { rgbToLab } from '../rgb-to-lab';

jest.mock('../rgb-to-lab');

describe('rgbToLch', () => {
  beforeEach(() => {
    (rgbToLab as jest.Mock).mockClear();
  });

  it('should convert RGB to LCH correctly', () => {
    (rgbToLab as jest.Mock).mockReturnValue({ l: 53.23, a: 80.11, b: 67.22 });
    const result = rgbToLch({ r: 255, g: 0, b: 0 });
    expect(result).toEqual(expect.objectContaining({
      l: expect.closeTo(53.23, 0.01),
      c: expect.closeTo(104.55, 0.01),
      h: expect.closeTo(39.99, 0.01)
    }));
    expect(rgbToLab).toHaveBeenCalledWith({ r: 255, g: 0, b: 0 });
  });

  it('should handle black and white correctly', () => {
    (rgbToLab as jest.Mock).mockReturnValue({ l: 0, a: 0, b: 0 });
    expect(rgbToLch({ r: 0, g: 0, b: 0 })).toEqual({ l: 0, c: 0, h: 0 });

    (rgbToLab as jest.Mock).mockReturnValue({ l: 100, a: 0, b: 0 });
    expect(rgbToLch({ r: 255, g: 255, b: 255 })).toEqual({ l: 100, c: 0, h: 0 });
  });

  it('should handle hue wrap-around correctly', () => {
    (rgbToLab as jest.Mock).mockReturnValue({ l: 50, a: -1, b: -1 });
    const result = rgbToLch({ r: 128, g: 128, b: 128 });
    expect(result.h).toBeCloseTo(225, 0.01);
  });

  it('should throw an error for invalid input types', () => {
    (rgbToLab as jest.Mock).mockImplementation(() => {
      throw new Error('Input must be an object');
    });
    expect(() => rgbToLch('not an object' as any)).toThrow('Input must be an object');
  });
});
