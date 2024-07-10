import { lchToRgb } from '../lch-to-rgb';
import { labToRgb } from '../lab-to-rgb';

jest.mock('../lab-to-rgb');

describe('lchToRgb', () => {
  beforeEach(() => {
    (labToRgb as jest.Mock).mockClear();
  });

  it('should convert LCH to RGB correctly', () => {
    (labToRgb as jest.Mock).mockReturnValue({ r: 255, g: 0, b: 0 });
    const result = lchToRgb({ l: 50, c: 100, h: 40 });
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
    expect(labToRgb).toHaveBeenCalledWith(expect.objectContaining({
      l: 50,
      a: expect.any(Number),
      b: expect.any(Number)
    }));
  });

  it('should throw an error for invalid input types', () => {
    expect(() => lchToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => lchToRgb({ l: '50', c: 100, h: 40 } as any)).toThrow('LCH values must be numbers');
  });

  it('should handle edge cases', () => {
    (labToRgb as jest.Mock).mockReturnValue({ r: 0, g: 0, b: 0 });
    expect(lchToRgb({ l: 0, c: 0, h: 0 })).toEqual({ r: 0, g: 0, b: 0 });

    (labToRgb as jest.Mock).mockReturnValue({ r: 255, g: 255, b: 255 });
    expect(lchToRgb({ l: 100, c: 0, h: 360 })).toEqual({ r: 255, g: 255, b: 255 });
  });
});
