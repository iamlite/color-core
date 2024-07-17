import { RGB } from '../../../types';
import { cmykToRgb, rgbToCmyk } from '../cmyk';

describe('CMYK <-> RGB Conversions', () => {
  describe('cmykToRgb', () => {
    it('should convert CMYK to RGB correctly', () => {
      expect(cmykToRgb({ c: 0, m: 100, y: 100, k: 0 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(cmykToRgb({ c: 100, m: 0, y: 100, k: 0 })).toEqual({ r: 0, g: 255, b: 0 });
      expect(cmykToRgb({ c: 100, m: 100, y: 0, k: 0 })).toEqual({ r: 0, g: 0, b: 255 });
      expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 0 })).toEqual({ r: 255, g: 255, b: 255 });
      expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 100 })).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle edge cases', () => {
      expect(cmykToRgb({ c: 50, m: 50, y: 50, k: 50 })).toEqual({ r: 64, g: 64, b: 64 });
    });

    it('should throw error for invalid input', () => {
      expect(() => cmykToRgb('invalid' as any)).toThrow('Input must be an object');
      expect(() => cmykToRgb({ c: 'invalid', m: 0, y: 0, k: 0 } as any)).toThrow('CMYK values must be numbers');
      expect(() => cmykToRgb({ c: -1, m: 0, y: 0, k: 0 })).toThrow('CMYK values must be between 0 and 100');
      expect(() => cmykToRgb({ c: 0, m: 101, y: 0, k: 0 })).toThrow('CMYK values must be between 0 and 100');
    });
  });

  describe('rgbToCmyk', () => {
    it('should convert RGB to CMYK correctly', () => {
      expect(rgbToCmyk({ r: 255, g: 0, b: 0 })).toEqual({ c: 0, m: 100, y: 100, k: 0 });
      expect(rgbToCmyk({ r: 0, g: 255, b: 0 })).toEqual({ c: 100, m: 0, y: 100, k: 0 });
      expect(rgbToCmyk({ r: 0, g: 0, b: 255 })).toEqual({ c: 100, m: 100, y: 0, k: 0 });
      expect(rgbToCmyk({ r: 255, g: 255, b: 255 })).toEqual({ c: 0, m: 0, y: 0, k: 0 });
      expect(rgbToCmyk({ r: 0, g: 0, b: 0 })).toEqual({ c: 0, m: 0, y: 0, k: 100 });
    });

    it('should handle edge cases', () => {
      expect(rgbToCmyk({ r: 128, g: 128, b: 128 })).toEqual({ c: 0, m: 0, y: 0, k: 50 });
    });

    it('should throw error for invalid input', () => {
      expect(() => rgbToCmyk('invalid' as any)).toThrow('Input must be an object');
      expect(() => rgbToCmyk({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
      expect(() => rgbToCmyk({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
      expect(() => rgbToCmyk({ r: 0, g: 256, b: 0 })).toThrow('RGB values must be between 0 and 255');
    });
  });

  describe('Bidirectional Conversion', () => {
    const testCases: RGB[] = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 0, b: 0 },
      { r: 128, g: 128, b: 128 },
      { r: 128, g: 0, b: 128 },
      { r: 255, g: 128, b: 0 },
    ];

    testCases.forEach((rgb) => {
      it(`should convert RGB ${JSON.stringify(rgb)} to CMYK and back correctly`, () => {
        const cmyk = rgbToCmyk(rgb);
        const convertedRgb = cmykToRgb(cmyk);

        // Use a tolerance for floating-point comparisons
        expect(convertedRgb.r).toBeCloseTo(rgb.r, 0);
        expect(convertedRgb.g).toBeCloseTo(rgb.g, 0);
        expect(convertedRgb.b).toBeCloseTo(rgb.b, 0);
      });
    });
  });
});
